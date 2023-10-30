const { PDFDocument, rgb, degrees, StandardFonts } = require("pdf-lib");
const fs = require("fs");

async function addWatermarkToPdf(pdfPath, text, outputPath) {
  const pdfBuffer = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const textWidth = 250;
  const textHeight = 45;

  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    const page = pdfDoc.getPage(i);
    const { width, height } = page.getSize();
    const rotationAngle = degrees(20.25);
    const fontSize = 16;

    page.drawText(watermarkText, {
      x: 50,
      y: height - 175,
      size: fontSize,
      color: rgb(0, 0, 0),
      opacity: 0.14,
      rotate: rotationAngle,
    });

    page.drawText(watermarkText, {
      x: width / 2 - textWidth / 2,
      y: height / 2 - textHeight / 2,
      size: fontSize,
      color: rgb(0, 0, 0),
      opacity: 0.14,
      rotate: rotationAngle,
    });

    page.drawText(watermarkText, {
      x: width - 300,
      y: 100,
      size: fontSize,
      color: rgb(0, 0, 0),
      opacity: 0.14,
      rotate: rotationAngle,
    });
  }

  const modifiedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, modifiedPdfBytes);

  console.log(" watermarks added to PDF successfully!");
}

const pdfPath = "input.pdf";
const email = "owaisnazir110928@gmail.com";
const userName = "Owais Nazir Dar";
const utcdate = new Date("01/10/2023");
const date = utcdate.toLocaleDateString();

const watermarkText = `Accessed by: ${userName}\nEmail ID: ${email}\nPurchased on: ${date}`;

const outputPath = "output.pdf";

addWatermarkToPdf(pdfPath, watermarkText, outputPath);
