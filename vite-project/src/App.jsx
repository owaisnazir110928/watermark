import { useEffect, useState } from "react";
import "./App.css";
import { PDFDocument, rgb, degrees } from "pdf-lib";

import profilePNG from "../profile.png";
import emailPNG from "../email.png";
import tagPNG from "../tag.png";

function App() {
  const email = "owaisnazir110928@gmail.com";
  const userName = "Owais Nazir Dar";
  const utcdate = new Date("01/10/2023");
  const date = utcdate.toLocaleDateString();
  const watermarkText = ` ${userName}\n ${email}\n ${date}`;

  async function addWatermarkToPdf(text) {
    const pdfUrl = "https://pdf-lib.js.org/assets/with_update_sections.pdf";
    const pdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const profilePngBytes = await fetch(profilePNG).then((res) =>
      res.arrayBuffer()
    );
    const profileImg = await pdfDoc.embedPng(profilePngBytes);

    const emailPngBytes = await fetch(emailPNG).then((res) =>
      res.arrayBuffer()
    );
    const emailImg = await pdfDoc.embedPng(emailPngBytes);

    const tagPngBytes = await fetch(tagPNG).then((res) => res.arrayBuffer());
    const tagImg = await pdfDoc.embedPng(tagPngBytes);

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
          rotate: degrees(25),
        });
      };

      addWatermark(width / 2 - 125, height - 175, text);
      addWatermark(width / 2 - 125, height / 2 - 22.5, text);
      addWatermark(width / 2 - 125, 75, text);

      const addPngs = (x, y, img) => {
        page.drawImage(img, {
          x,
          y,
        });
      };
      addPngs(width / 2 - 155, height - 190, profileImg);
      addPngs(width / 2 - 142.5, height - 215, emailImg);
      addPngs(width / 2 - 130, height - 240, tagImg);

      addPngs(width / 2 - 155, height / 2 - 37.5, profileImg);
      addPngs(width / 2 - 142.5, height / 2 - 62.5, emailImg);
      addPngs(width / 2 - 130, height / 2 - 87.5, tagImg);

      addPngs(width / 2 - 155, 60, profileImg);
      addPngs(width / 2 - 142.5, 35, emailImg);
      addPngs(width / 2 - 130, 10, tagImg);
    }

    const modifiedPdfBytes = await pdfDoc.save();
    const modifiedPdfBlob = new Blob([modifiedPdfBytes], {
      type: "application/pdf",
    });
    const modifiedPdfUrl = URL.createObjectURL(modifiedPdfBlob);
    window.open(modifiedPdfUrl);

    console.log("Watermarks and SVG image added to PDF successfully!");
  }

  useEffect(() => {
    addWatermarkToPdf(watermarkText);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          addWatermarkToPdf(watermarkText);
        }}
      >
        Click here
      </button>
    </>
  );
}

export default App;
