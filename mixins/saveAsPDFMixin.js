import { jsPDF } from 'jspdf'

export const saveAsPDFMixin = {
  created() {
    console.log('Hello from the mixin!')
  },
  methods: {
    // fromHTML(doc, parentElement) {
    //   // We'll make our own renderer to skip this editor
    //   const specialElementHandlers = {
    //     '#editor'(element, renderer) {
    //       return true
    //     },
    //   }

    //   // All units are in the set measurement for the document
    //   // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
    //   doc.fromHTML(parentElement, 15, 15, {
    //     width: 170,
    //     elementHandlers: specialElementHandlers,
    //   })
    // },
    drawPDF(doc, traits) {
      /* Size of an A4 page in pts */
      const pageWidth = 595.23809
      const pageHeight = 841.83673
      const leftStart = pageWidth / 10
      let topStart = pageHeight / 20
      const rectWidth = pageWidth * 0.8
      const rectHeight = pageHeight * 0.15
      const headingHeight = rectHeight / 9.6
      const textHeight = rectHeight / 10.8
      const headingMarginTop = headingHeight / 3
      const headingMarginBottom = headingHeight / 3
      const headingMarginLeft = 3
      const textMarginLeft = 6

      // addFont(doc)
      // doc.setDrawColor(0)
      // doc.setFont("Finlandica-Bold")
      doc.setFontSize(12)
      // doc.text(speciesName, leftStart, topStart)
      doc.text('Alien Name', leftStart, topStart)
      topStart += 30

      traits.forEach((trait) => {
        //     doc.setFont("Finlandica-Bold")
        // doc.setFillColor(colors[i][0], colors[i][1], colors[i][2])
        // doc.rect(leftStart, topStart, rectWidth, rectHeight, "F")
        doc.setFontSize(headingHeight)
        doc.text(
          trait.main.name,
          leftStart + headingMarginLeft,
          topStart + headingMarginTop,
          { baseline: 'top' }
        )
        const textStart =
          topStart + headingHeight + headingMarginTop + headingMarginBottom
        // doc.setFont("Finlandica-Regular")
        doc.setFontSize(textHeight)
        doc.text(
          doc.splitTextToSize(
            trait.main.description,
            rectWidth - textMarginLeft
          ),
          leftStart + textMarginLeft,
          textStart,
          { baseline: 'top' }
        )
        topStart += rectHeight
        console.log(doc.splitTextToSize(trait.main.description))
        //     doc.text(trait.main.name, 10, top)
        //     top += 5
        //     doc.text(trait.main.description, 10, top)
        //     top += 5
        //     if (trait.additions) {
        //       doc.text(trait.styles.name, 10, top)
        //       top += 5
        //       doc.text(trait.styles.description, 10, top)
        //       top += 5
        //     }
        //     if (trait.additions) {
        //       doc.text(trait.additions.name, 10, top)
        //       top += 5
        //       doc.text(trait.additions.description, 10, top)
        //       top += 5
        //     }
        //     top += 10
      })
    },
    saveAsPDF(traits, htmlElement) {
      // eslint-disable-next-line new-cap
      const doc = new jsPDF({ unit: 'pt' })
      this.drawPDF(doc, traits)
      // this.fromHTML(doc, htmlElement)

      // doc.html(htmlElement, {
      //   callback: (doc) => {
      //     doc.save('doodledoo' + Math.floor(Math.random() * 1000))
      //   },
      //   jsPDF: doc,
      //   filename: 'YourGeneratedAlienSpecies.pdf',
      //   width: 10,
      //   windowWidth: 30,
      //   x: 5,
      //   y: 5,
      // })
      doc.save('a4.pdf')
    },
  },
}
