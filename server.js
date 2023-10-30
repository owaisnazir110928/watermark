const { PDFDocument, rgb, degrees, StandardFonts } = require("pdf-lib");
const fs = require("fs");

async function addWatermarkToPdf(pdfPath, text, outputPath) {
  const pdfBuffer = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });

  const customFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const textSize = 35
  const textWidth = customFont.widthOfTextAtSize(text, textSize)
  const textHeight = customFont.heightAtSize(textSize)

  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    const page = pdfDoc.getPage(i);
    const { width, height } = page.getSize();
    const rotationAngle = degrees(20.25);
    const fontSize = 16;
    // Top Left Position
    page.drawText(watermarkText, {
      x: 50,
      y: height - 175,
      size: fontSize,
      color: rgb(0.5, 0.5, 0.5),
      opacity: 0.5,
      rotate: rotationAngle,
    });

    // Middle Position
    page.drawText(watermarkText, {
      x: width / 2 - textWidth / 2,
      y: height / 2 - textHeight / 2,
      size: fontSize,
      color: rgb(0.5, 0.5, 0.5),
      opacity: 0.5,
      rotate: rotationAngle,
    });

    // Bottom Right Position
    page.drawText(watermarkText, {
      x: width - 300,
      y: 100,
      size: fontSize,
      color: rgb(0.5, 0.5, 0.5),
      opacity: 0.5,
      rotate: rotationAngle,
    });
  }

  const modifiedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, modifiedPdfBytes);

  console.log(
    "Rotated text watermarks added to different positions on the PDF successfully!"
  );
}

const pdfPath = "input.pdf";
const watermarkText =
  "Accessed by: Rahi Ahriwar\nEmail ID :  raviahirwar660@gmail.com\nPurchased on :  01-10-2023";
const outputPath = "output.pdf";

addWatermarkToPdf(pdfPath, watermarkText, outputPath);
