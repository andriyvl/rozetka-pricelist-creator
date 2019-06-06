<template>
    <div>
        <p id="xml-layout">
               <pre>{{Test}} </pre>
        </p>
    </div>
</template>

<script>
import Editor from './Editor'

export default {
  name: 'XmlPreview',
  props: ['xmlValues'],

  data () {
    return {
      f: `    `,
      n: `
`
    }
  },
  methods: {
    ReturnCurs (p) {
      let f = this.f
      let n = this.n
      let a = f + f + `<currencies>` + n
      for (let [i, k] of Object.keys(p)) {
        if (i != 0) { a += n }
        a += f + f + f + `<currency id="${p[i].Id}" rate="${p[i].Rate}"/>`
      } return a + n + f + f + `</currencies>`
    },
    ReturnCats (p) {
      let f = this.f
      let n = this.n
      let a = f + f + `<categories>` + n
      for (let [i, k] of Object.keys(p)) {
        if (i != 0) { a += n }
        a += f + f + f + `<category id="${p[i].Id}">${p[i].Name}</category>`
        for (let [i1, k1] of Object.keys(p[i].Child)) {
          a += n + f + f + f + `<category id="${p[i].Child[i1].Id}" parentId="${p[i].Id}">${p[i].Child[i1].Name}</category>`
        }
      } return a + n + f + f + `</categories>`
    },
    ReturnPics (p) {
      let f = this.f
      let n = this.n
      let a = ``
      for (let i of Object.keys(p)) {
        if (i != 0) { a += n }
        a += f + f + f + f + `<picture>${p[i]}</picture>`
      } return a
    },
    ReturnPars (p) {
      let f = this.f
      let n = this.n
      let a = ``
      for (let i of Object.keys(p)) {
        if (i != 0) { a += n }
        a += f + f + f + f + `<param name="${p[i].Name}">${p[i].Descr}</param>`
      } return a
    }
  },

  computed: {
    Test () {
      const x = this.xmlValues
      let f = this.f
      let n = this.n
      let arr = []
      if (x.Xml.Version != '') { arr.push(`<?xml version="${x.Xml.Version}" encoding="${x.Xml.Encoding}"?>`) };
      arr.push(`<yml_catalog date="${x.YmlDate}">`)
      arr.push(f + `<shop>`)
      if (x.Name != '') { arr.push(f + f + `<name>${x.Name}</name>`) };
      if (x.Company) { arr.push(f + f + `<company>${x.Company}</company>`) };
      if (x.Url) { arr.push(f + f + `<url>${x.Url}</url>`) };
      arr.push(this.ReturnCurs(x.Curs))
      arr.push(this.ReturnCats(x.Cat))
      arr.push(f + f + `<offers>`)
      // looping thru offers
      for (let o in x.Offers) {
        const p = x.Offers[o].data
        arr.push(f + f + f + `<offer available="${x.Offers[o].Available}" id="${x.Offers[o].Id}">`)
        if (p.Url != '') { arr.push(f + f + f + f + `<url>${p.Url}</url>`) };
        if (p.Price != '') { arr.push(f + f + f + f + `<price>${p.Price}</price>`) };
        if (p.CurId != '') { arr.push(f + f + f + f + `<currencyId>${p.CurId}</currencyId>`) };
        if (p.CatId != '') { arr.push(f + f + f + f + `<categoryId>${p.CatId}</categoryId>`) };
        if (p.Pics[0] != '') { arr.push(this.ReturnPics(p.Pics)) };
        if (p.Name != '') { arr.push(f + f + f + f + `<name>${p.Name}</name>`) };
        if (p.Vendor != '') { arr.push(f + f + f + f + `<vendor>${p.Vendor}</vendor>`) };
        if (p.Descr != '') { arr.push(f + f + f + f + `<description><![CDATA[` + p.Descr + n + f + f + f + f + `]]></description>`) };
        if (p.Pars.length != 0) { arr.push(this.ReturnPars(p.Pars)) };
        if (p.StockQ != '') { arr.push(f + f + f + f + `<stock_quantity>${p.StockQ}</stock_quantity>`) }
        arr.push(f + f + f + `</offer>`)
      }
      arr.push(f + f + `</offers>`)
      arr.push(f + `</shop>`)
      arr.push(`</yml_catalog>`)

      let str = `` // converting array to string with new line
      for (let b of arr) {
        str += b + `
`
      };
      return str
    }
  }
}
</script>

<style >
#xml-layout * {
text-align: left;
list-style-type: none;
}
</style>
