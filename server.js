const { PDFDocument, rgb, degrees } = require("pdf-lib");
const fs = require("fs");

async function addWatermarkToPdf(pdfPath, text, svgPath, outputPath) {
  const pdfBuffer = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBuffer);

  const fontSize = 16;
  const opacity = 0.2;

  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    const page = pdfDoc.getPage(i);
    const { width, height } = page.getSize();

    const addWatermark = (x, y, content) => {
      page.drawText(content, {
        x,
        y,
        size: fontSize,
        color: rgb(0.659, 0.659, 0.659),
        opacity,
        rotate: degrees(20.25),
      });
    };

    addWatermark(width / 2 - 125, height - 175, text);
    addWatermark(width / 2 - 125, height / 2 - 22.5, text);
    addWatermark(width / 2 - 125, 75, text);
  }

  const modifiedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, modifiedPdfBytes);

  console.log("Watermarks and SVG image added to PDF successfully!");
}

// Usage example:
const pdfPath = "input.pdf";
const email = "owaisnazir110928@gmail.com";
const userName = "Owais Nazir Dar";
const utcdate = new Date("01/10/2023");
const date = utcdate.toLocaleDateString();
const watermarkText = `Accessed by: ${userName}\nEmail ID: ${email}\nPurchased on: ${date}`;
const svgPath = "profile.svg";
const outputPath = "output.pdf";

addWatermarkToPdf(pdfPath, watermarkText, svgPath, outputPath);
