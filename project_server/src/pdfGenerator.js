//pdf libs
const PDFDocument = require('pdfkit');
const fs=require('fs');
const fontSize = 10

const generateForm = (doc, form) => {
    const texts =  [
        "1. Allgemeine Angaben (Auszufüllen vom Antragsteller)",
        "Antragsteller : ",
        "Datum : ",
        "Bezeichnung des neuen Stoffes?",
        "Ab wann wird der neue Stoff benötigt?",
        "Warum wird ein neuer Stoff benötigt?",
        "Wurde geprüft, ob ein Stoff mit den benötigten Eigenschaften bereits",
        "im Haus ist (Gefahrstoffkataster)?",
        "Für welche Gruppe/Abteilung?",
        "Für welchen Arbeitsgang? ",
        "Verantwortlicher Meister?",
        "Dauer der Tätigkeiten (Std./Schicht) : ",
        "Verarbeitungstemperatur (°C) : ",
        "Vorratsmenge am Arbeitsplatz (kg/Ltr) : ",
        "Beschreibung des Arbeitsbereichs : ",
        "Anlagenart : ",
        "Verfahren mit Aerosolbildung : ",
        "Unmittelbarer Hautkontakt zu dem Stoff : ",
        "Lüftungseinrichtungen : ",
        "Wo soll der neue Stoff gelagert werden?",
        "In welchen Gebinden wird der neue Stoff gelagert?",
        "Welche Mengen sollen von dem neuen Stoff gelagert werden? (kg)",
        "Ein aktuelles Sicherheitsdatenblatt für den neuen Stoff muß vom Antragsteller diesem Antrag beigefügt werden!"
    ];
    
    // Add another page
    doc.font('Times-Bold')
       .fontSize(fontSize)
       .text(texts[0], {
        align: 'center'
      }).moveDown(0.5);
    
    doc.font('Times-Roman');

    doc.text(texts[1] + form.applicant);
    
    doc.text(texts[2] + (new Date(form.date)).toLocaleDateString()).moveDown(0.5);;
    
    doc.text(texts[3] + '\n' + form.substance_name).moveDown(0.5);
    
    doc.text(texts[4] + '\n' + form.date_needed).moveDown(0.5);
    
    doc.text(texts[5] + '\n' + form.reason_needed).moveDown(0.5);
    
    doc.text(texts[6]).moveDown(0.5);
       
    doc.text(texts[7] + '\n' + form.inHouse).moveDown(0.5);
    
    doc.text(texts[8] + '\n' + form.department).moveDown(0.5);
    
    doc.text(texts[9] + '\n' + form.operation).moveDown(0.5);
    
    doc.text(texts[10] + '\n' + form.master).moveDown(0.5);
    
    doc.text(texts[11] + form.duration);
    
    doc.text(texts[12] + form.working_temp).moveDown(0.5);
    
    doc.text(texts[13] + form.stock_qty);
    
    doc.text(texts[14] + form.description).moveDown(0.5);

    doc.text(texts[15] + form.plant_type);

    doc.text(texts[16] + form.aerosol_method).moveDown(0.5);

    doc.text(texts[17] + form.skin_contact);

    doc.text(texts[18] + form.v_equipment).moveDown(0.5);

    doc.text(texts[19] + '\n' + form.material_storage_place).moveDown(0.5);

    doc.text(texts[20] + '\n' + form.material_container).moveDown(0.5);

    doc.text(texts[21] + '\n' + form.substance_qty).moveDown(0.5);
    
    doc.font('Times-Bold');

    doc.text(texts[22]);
}

const generateForm2 = (doc, form) => {
   const texts =  [
      "2. Gefährdungsbeurteilung (Auszufüllen von der FASi)",
      "Ist der neue Stoff ein Gefahrstoff?",
      "Betriebsanweisung §14 GefStoffV erforderlich?",
      "Wie ist der Stoff gekennzeichnet?",
      "Zündtemperatur (°C) : ",
      "Lagerhinweise : ",
      "Lösemittelgehalt (VOC) : ",
      "Ergeben sich durchzuführende Schutzmaßnahmen gemäß GefStoffV oder des Brandschutzes (zusätzliche Feuerlöscher usw.)?",
      "Wenn ja, welche?",
      "Technische Maßnahmen : ",
      "Organisatorische Maßnahmen : ",
      "Persönliche Maßnahmen?",
      "3. Angaben zur VAwS (Auszufüllen von der FASi)",
      "Gibt es für die LAU-HBV Anlage eine Betriebsanweisung nach §3 VAwS?",
      "Welche Wassergefährdungsklasse hat der Stoff?",
      "Ändert sich die Wassergefährdungsstufe der LAU-HBV Anlage?",
      "Wenn ja, neu eingestuft in WGS",
      "Ergeben sich Maßnahmen aus der Wassergefährdungsstufe?",
      "Wenn ja, welche?",
      "Technische Maßnahmen : ",
      "Organisatorische Maßnahmen : ",
      "Persönliche Maßnahmen?",
      "4. Freigabe des Stoffes (Auszufüllen von der FASi)",
      "Der Stoff darf beschafft werden!",
      "Wenn „nein“, warum nicht?",
   ];
   
   // Add another page
   doc.font('Times-Bold')
      .fontSize(fontSize)
      .text(texts[0], {
       align: 'center'
     }).moveDown(0.5);
   
   doc.font('Times-Roman');

   doc.text(texts[1] + '\n' + form.isHazardous).moveDown(0.5);
   
   doc.text(texts[2] + '\n' + form.instRequired).moveDown(0.5);;
   
   doc.text(texts[3] + '\n' + form.label).moveDown(0.5);
   
   doc.text(texts[4] + form.duration)
   
   doc.text(texts[5] + form.storage_info)

   doc.text(texts[6] + form.solvent_content).moveDown(0.5);
      
   doc.text(texts[7] + '\n' + form.protMeasureRequired).moveDown(0.5);
   
   doc.text(texts[8] + '\n' + form.protMeasure).moveDown(0.5);
   
   doc.text(texts[9] + form.techMeasure).moveDown(0.5);
   
   doc.text(texts[10] + form.orgMeasure).moveDown(0.5);
   
   doc.text(texts[11] + '\n' + form.perMeasure).moveDown(0.5);
   
   doc.font('Times-Bold');

   doc.text(texts[12], {
      align: 'center'
    }).moveDown(0.5);

   doc.font('Times-Roman');
   
   doc.text(texts[13] + '\n' + form.manual).moveDown(0.5);
   
   doc.text(texts[14] + '\n' + form.num).moveDown(0.5);

   doc.text(texts[15] + '\n' + form.isChanging);

   doc.text(texts[16] + '\n' + form.letter).moveDown(0.5);

   doc.text(texts[17] + '\n' + form.anyMeasure);

   doc.text(texts[18] + '\n' + form.measure).moveDown(0.5);

   doc.text(texts[19] + form.techMeasure2).moveDown(0.5);

   doc.text(texts[20] + form.orgMeasure2).moveDown(0.5);

   doc.text(texts[21] + '\n' + form.perMeasure2).moveDown(0.5);
   
   doc.font('Times-Bold');
   
   doc.text(texts[22], {
      align: 'center'
    });

   doc.font('Times-Roman');

   doc.text(texts[23] + '\n' + form.isProcured).moveDown(0.5);

   doc.text(texts[24] + '\n' + form.reason).moveDown(0.5);
}

const generatePDF = (name, form, form2) => {
    // Create a document
    const doc = new PDFDocument;

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream('./documents/' + name + '.pdf'));

    generateForm(doc, form)
    doc.addPage()
    generateForm2(doc, form2)

    // Finalize PDF file
    doc.end();
};

module.exports = {
    generatePDF
};