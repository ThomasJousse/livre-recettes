/**
 * Livre de recettes — API de lecture du Sheet pour l'app Android.
 * Projet Apps Script autonome (script.google.com), propriétaire : le compte du Sheet.
 * Le Sheet reste privé : seul ce script le lit, et il ne répond qu'avec la bonne clé.
 */
const CLE = "COLLE_ICI_LA_CLE";
const SHEET_ID = 'ID_DU_SHEET';
const ONGLETS = { rec: 'Recettes', ing: 'Ingrédients', eta: 'Étapes', cat: 'Catalogue' };

function doGet(e) {
  if (!e || !e.parameter || e.parameter.k !== CLE) return json_({ error: 'forbidden' });
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const out = { at: Date.now() };
    for (const k in ONGLETS) {
      const sh = ss.getSheetByName(ONGLETS[k]);
      out[k] = sh ? sh.getDataRange().getDisplayValues() : [];
    }
    return json_(out);
  } catch (err) {
    return json_({ error: 'tool_error' });
  }
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
