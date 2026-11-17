import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory or JSON file storage for submitted leads
const LEADS_FILE = path.join(process.cwd(), "leads.json");

function getStoredLeads() {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const data = fs.readFileSync(LEADS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading leads file:", err);
  }
  return [];
}

function saveLead(leadData: any) {
  const leads = getStoredLeads();
  const newLead = {
    id: "LEAD-" + Date.now(),
    submittedAt: new Date().toISOString(),
    ...leadData,
  };
  leads.unshift(newLead);
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing leads file:", err);
  }
  return newLead;
}

// Google Apps Script source string to provide to the user
const GOOGLE_APPS_SCRIPT_CODE = `/**
 * JAYTECH FARMS - Google Sheets Automation Script
 * Paste this script in Google Sheets: Extensions -> Apps Script
 * Click Deploy -> New Deployment -> Select 'Web App'
 * Execute as: 'Me', Who has access: 'Anyone'
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Set headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Lead ID",
        "Full Name",
        "Company Name",
        "Email",
        "Phone / WhatsApp",
        "Location / Residence",
        "Farming Interests",
        "Land Status",
        "Land Scale",
        "Estimated Budget",
        "Project Timeline",
        "Additional Details"
      ]);
      // Format Header Row
      var headerRange = sheet.getRange(1, 1, 1, 13);
      headerRange.setBackground("#1b4332");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
    }
    
    var data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter || {};
    }
    
    var timestamp = new Date();
    var leadId = data.id || "LEAD-" + Date.now();
    var fullName = data.fullName || "";
    var companyName = data.companyName || "N/A";
    var email = data.email || "";
    var phone = data.phone || "";
    var location = data.location || "";
    var farmingInterests = Array.isArray(data.farmingInterests) ? data.farmingInterests.join(", ") : (data.farmingInterests || "");
    var landStatus = data.landStatus || "";
    var landScale = data.landScale || "";
    var budget = data.budget || "";
    var timeline = data.timeline || "";
    var additionalDetails = data.additionalDetails || "";

    sheet.appendRow([
      timestamp,
      leadId,
      fullName,
      companyName,
      email,
      phone,
      location,
      farmingInterests,
      landStatus,
      landScale,
      budget,
      timeline,
      additionalDetails
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      "result": "success",
      "message": "Lead details saved successfully to Google Sheet!"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "result": "error",
      "error": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
`;

// Helper to construct WhatsApp URL targeting 08033106047 (+2348033106047)
function constructWhatsAppUrl(lead: any): string {
  const targetPhone = "2348033106047"; // Owner's WhatsApp number

  const text = `*NEW JAYTECH FARMS CLIENT BRIEFING* 🌾
-----------------------------------
👤 *Full Name:* ${lead.fullName || 'N/A'}
🏢 *Company:* ${lead.companyName || 'N/A'}
✉️ *Email:* ${lead.email || 'N/A'}
📱 *WhatsApp/Phone:* ${lead.phone || 'N/A'}
🌍 *Location:* ${lead.location || 'N/A'}

🌱 *Farming Interest:*
${Array.isArray(lead.farmingInterests) ? lead.farmingInterests.map((i: string) => `• ${i}`).join('\n') : lead.farmingInterests || 'N/A'}

📍 *Land Status:* ${lead.landStatus || 'N/A'}
📐 *Project Scale:* ${lead.landScale || 'N/A'}
💰 *Budget Bracket:* ${lead.budget || 'N/A'}
⏱️ *Timeline:* ${lead.timeline || 'N/A'}

📝 *Requirements / Taste:*
"${lead.additionalDetails || 'None specified'}"

-----------------------------------
*Ref ID:* ${lead.id}
Sent via JAYTECH FARMS Premium Portal.`;

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
}

// API Routes
app.post("/api/submit-lead", async (req, res) => {
  try {
    const leadData = req.body;
    
    if (!leadData.fullName || !leadData.phone) {
      return res.status(400).json({ error: "Full Name and Phone Number are required." });
    }

    // Save lead locally
    const saved = saveLead(leadData);

    // Generate WhatsApp URL
    const whatsappUrl = constructWhatsAppUrl(saved);

    // Forward to Google Sheet WebApp
    let googleSheetSynced = false;
    const DEFAULT_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbyHSOC6QaYuTbRH8C2NN-xahi0qijj9rq-31TUZWP0hLpkLsE-Bz1WiE5OnrRTtveFWiw/exec";
    const webappUrl = req.body.googleSheetWebappUrl || process.env.GOOGLE_SHEET_WEBAPP_URL || DEFAULT_WEBAPP_URL;
    if (webappUrl) {
      try {
        await fetch(webappUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(saved),
        });
        googleSheetSynced = true;
      } catch (err) {
        console.error("Error forwarding to Google Sheet WebApp:", err);
      }
    }

    return res.json({
      success: true,
      lead: saved,
      whatsappUrl,
      googleSheetSynced,
      message: "Lead briefing submitted successfully!",
    });
  } catch (error: any) {
    console.error("Error in /api/submit-lead:", error);
    return res.status(500).json({ error: "Failed to process lead submission" });
  }
});

app.get("/api/leads", (req, res) => {
  const leads = getStoredLeads();
  res.json({ total: leads.length, leads });
});

app.get("/api/google-sheets-script", (req, res) => {
  res.json({ script: GOOGLE_APPS_SCRIPT_CODE });
});

// Start Express Server with Vite Middleware in Development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`JAYTECH FARMS Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
