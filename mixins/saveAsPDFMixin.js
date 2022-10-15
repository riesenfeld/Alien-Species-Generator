import { jsPDF } from 'jspdf'
// import { TestWatcher } from 'jest'
import { finlandicaRegular } from '../assets/jsPDFFontDefinitions/Finlandica-Regular.js'
import { finlandicaBold } from '../assets/jsPDFFontDefinitions/Finlandica-Bold.js'

export const saveAsPDFMixin = {
  created() {
    console.log('Hello from the mixin!')
  },
  methods: {
    /**
     * Version 2.5.1 docs: https://raw.githack.com/MrRio/jsPDF/master/docs/index.html
     *
     * Font files generated from: https://peckconsulting.s3.amazonaws.com/fontconverter/fontconverter.html
     * Referencing this tutorial: https://www.devlinpeck.com/tutorials/jspdf-custom-font
     */

    addFont(jsPDFInstance) {
      jsPDFInstance.addFileToVFS('Finlandica-Bold.ttf', finlandicaBold)
      jsPDFInstance.addFont('Finlandica-Bold.ttf', 'Finlandica-Bold', 'normal')

      jsPDFInstance.addFileToVFS('Finlandica-Regular.ttf', finlandicaRegular)
      jsPDFInstance.addFont(
        'Finlandica-Regular.ttf',
        'Finlandica-Regular',
        'normal'
      )
    },
    // drawPDF(doc, traits) {
    //   /* Size of an A4 page in pts */
    //   const pageWidth = 595.23809
    //   const pageHeight = 841.83673
    //   const leftStart = pageWidth / 10
    //   let topStart = pageHeight / 20
    //   const rectWidth = pageWidth * 0.8
    //   const rectHeight = pageHeight * 0.15
    //   const headingHeight = rectHeight / 9.6
    //   const textHeight = rectHeight / 10.8
    //   const headingMarginTop = headingHeight / 3
    //   const headingMarginBottom = headingHeight / 3
    //   const headingMarginLeft = 3
    //   const textMarginLeft = 6

    //   // doc.setDrawColor(0)
    //   doc.setFont('Finlandica-Bold')
    //   doc.setFontSize(24)
    //   // doc.text(speciesName, leftStart, topStart)
    //   doc.text('Alien Name', leftStart, topStart)
    //   topStart += 30

    //   traits.forEach((trait) => {
    //     doc.setFont('Finlandica-Bold')
    //     // doc.setFillColor(colors[i][0], colors[i][1], colors[i][2])
    //     // doc.rect(leftStart, topStart, rectWidth, rectHeight, "F")
    //     doc.setFontSize(headingHeight)
    //     doc.text(
    //       trait.main.name,
    //       leftStart + headingMarginLeft,
    //       topStart + headingMarginTop,
    //       { baseline: 'top' }
    //     )
    //     const textStart =
    //       topStart + headingHeight + headingMarginTop + headingMarginBottom
    //     doc.setFont('Finlandica-Regular')
    //     doc.setFontSize(textHeight)
    //     let stringArray = doc.splitTextToSize(
    //       trait.main.description,
    //       rectWidth - textMarginLeft
    //     )
    //     doc.text(stringArray, leftStart + textMarginLeft, textStart, {
    //       baseline: 'top',
    //     })

    //     // if (trait.styles) {
    //     //   doc.setFont('Finlandica-Bold')
    //     //   doc.text(
    //     //     trait.styles.name,
    //     //     leftStart + headingMarginLeft,
    //     //     topStart + headingMarginTop,
    //     //     { baseline: 'top' }
    //     //   )
    //     // }

    //     if (trait.additions) {
    //       topStart +=
    //         textHeight * stringArray.length +
    //         headingHeight +
    //         headingMarginTop +
    //         headingMarginBottom
    //       doc.setFont('Finlandica-Bold')
    //       doc.text(
    //         trait.additions.name,
    //         leftStart + headingMarginLeft,
    //         topStart + headingMarginTop,
    //         { baseline: 'top' }
    //       )

    //       topStart += headingMarginBottom

    //       doc.setFont('Finlandica-Regular')
    //       stringArray = doc.splitTextToSize(
    //         trait.additions.description,
    //         rectWidth - textMarginLeft
    //       )
    //       doc.text(stringArray, leftStart + textMarginLeft, textStart, {
    //         baseline: 'top',
    //       })
    //       topStart += textHeight * stringArray.length
    //     }

    //     topStart += rectHeight
    //   })
    // },

    // convertTraitsToText(doc, traits) {
    //   /**
    //    * [
    //    *  {
    //    *    mainName: String,
    //    *    mainDescription: String,
    //    *    stylesName: String || False,
    //    *    stylesDescription: String || False,
    //    *    additionsName: String || False,
    //    *    additionsDescription: String || False,
    //    *  }
    //    * ]
    //    */
    //   const textArray = []
    //   traits.forEach((trait) => {
    //     // const hasStyle = trait.styles !== false
    //     const hasStyle = false
    //     const hasAddition = trait.additions !== false
    //     console.log(trait.main.name + ' hasStyle?' + hasStyle)
    //     const obj = {
    //       mainName: trait.main.name,
    //       mainDescription: trait.main.description,
    //       stylesName: hasStyle ? trait.styles.name : false,
    //       stylesDescription: hasStyle ? trait.styles.description : false,
    //       additionsName: hasAddition ? trait.additions.name : false,
    //       additionsDescription: hasAddition
    //         ? doc.trait.additions.description
    //         : false,
    //     }
    //     textArray.push(obj)
    //   })
    //   return textArray
    // },
    // drawPDF2(doc, speciesName, textArray) {
    //   /* Size of an A4 page in pts */
    //   const pageWidth = 595.23809
    //   const pageHeight = 841.83673
    //   const leftStart = pageWidth / 10
    //   let topStart = pageHeight / 20
    //   // const rectWidth = pageWidth * 0.8
    //   // const rectHeight = pageHeight * 0.15
    //   // const headingHeight = rectHeight / 9.6
    //   // const textHeight = rectHeight / 10.8
    //   // const headingMarginTop = headingHeight / 3
    //   // const headingMarginBottom = headingHeight / 3
    //   // const headingMarginLeft = 3
    //   // const textMarginLeft = 6

    //   doc.setFont('Finlandica-Bold')
    //   doc.setFontSize(24)
    //   doc.text(speciesName, leftStart, topStart)
    //   topStart += 30

    //   textArray.forEach((obj) => {
    //     doc.setFontSize(18)
    //     doc.text(obj.mainName, leftStart, topStart)
    //     topStart += 20

    //     doc.setFont('Finlandica-Regular')
    //     doc.setFontSize(12)
    //     doc.text(obj.mainDescription, leftStart, topStart)
    //     topStart += 12 * obj.mainDescription.length
    //   })
    // },

    drawAndAdvance(doc, string, fontSize, textType, topPosition) {
      const lineHeightFactor = 1.15
      const maxWidth = 500
      let marginLeft = 20

      if (textType === 'superheading') {
        doc.setFont('Finlandica-Bold')
        /** Leaving this here in case I want to do something special */
      } else if (textType === 'heading') {
        doc.setFont('Finlandica-Bold')
      } else if (textType === 'subheading') {
        doc.setFont('Finlandica-Bold')
        marginLeft = 25
      } else {
        doc.setFont('Finlandica-Regular')
        marginLeft = 25
      }

      doc.setFontSize(fontSize)
      const stringArray = doc.splitTextToSize(string, maxWidth)
      doc.text(stringArray, marginLeft, topPosition, {
        baseline: 'top',
        lineHeightFactor,
      })

      topPosition += stringArray.length * fontSize * lineHeightFactor // need to add a little bottom margin too

      return topPosition
    },

    drawPDF(doc, speciesName, traits) {
      let topPosition = 10
      topPosition = this.drawAndAdvance(
        doc,
        speciesName,
        28,
        'superheading',
        topPosition
      )
      topPosition += 10
      traits.forEach((trait) => {
        topPosition = this.drawAndAdvance(
          doc,
          trait.main.name,
          18,
          'heading',
          topPosition
        )
        topPosition += 5
        topPosition = this.drawAndAdvance(
          doc,
          trait.main.description,
          12,
          'regular',
          topPosition
        )
        if (trait.styles) {
          topPosition += 5
          topPosition = this.drawAndAdvance(
            doc,
            trait.styles.name,
            12,
            'subheading',
            topPosition
          )
          topPosition += 3
          topPosition = this.drawAndAdvance(
            doc,
            trait.styles.description,
            10,
            'regular',
            topPosition
          )
        }
        if (trait.additions) {
          topPosition += 5
          topPosition = this.drawAndAdvance(
            doc,
            trait.additions.name,
            12,
            'subheading',
            topPosition
          )
          topPosition = this.drawAndAdvance(
            doc,
            trait.additions.description,
            10,
            'regular',
            topPosition
          )
        }
        topPosition += 10
      })
    },
    saveAsPDF(speciesName, traits) {
      // eslint-disable-next-line new-cap
      const doc = new jsPDF({ unit: 'pt' })
      // eslint-disable-next-line new-cap
      // const doc = new jsPDF({
      //   orientation: 'p',
      //   unit: 'mm',
      //   format: 'a4',
      // })

      this.addFont(doc)

      // const wrapper = document.createElement('div')
      // const header = document.createElement('h1')
      // header.innerText = 'Alien Name'
      // const info = document.createElement('p')
      // info.innerText = traits[0].main.description
      // wrapper.append(header)
      // wrapper.append(info)

      // wrapper.style.width = '400px'
      // wrapper.style.fontSize = '0.5rem'
      // wrapper.style.fontFamily = 'Finlandica-Regular'

      // const el = document.getElementById('main')
      // el.style.textDecoration = 'underline'
      // el.style.fontFamily = 'Finlandica-Regular'
      // doc.html(el, {
      //   callback: (doc) => {
      //     doc.save()
      //   },
      //   width: 200,
      //   windowWidth: 400,
      //   fontFaces: [
      //     {
      //       family: 'Finlandica',
      //       // style: 'normal',
      //       // weight: '500',
      //       // stretch: 'normal',
      //       src: ['../assets/fonts/Finlandica-Regular.ttf'],
      //       url: '../assets/fonts/Finlandica-Regular.ttf',
      //       format: 'truetype',
      //     },
      //   ],
      //   // jsPDF: doc,
      // })
      // this.drawPDF(doc, traits)
      // const textArray = this.convertTraitsToText(doc, traits)
      // this.drawPDF2(doc, 'Alien Name', textArray)
      this.drawPDF(doc, speciesName, traits)
      doc.save('a4.pdf')
    },
  },
}
