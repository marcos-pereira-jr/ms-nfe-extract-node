import { JSDOM } from 'jsdom';
import moment from 'moment';

const importNFe = (data) => {

    console.log("🤔 - Trabalhando na extração")
    const dom = new JSDOM(data);
    const table = dom.window.document.querySelector("table");
    var produto = {};
    var produtos = []
    try {
        const date = dom.window.document.querySelector("#infos > div:nth-child(1) > ul:nth-child(2) > li:nth-child(1)");
        const indexFirtDate = date.innerHTML.indexOf("Emissão: </strong>");
        const indexLastDate = date.innerHTML.indexOf("- Via Consumidor 2");
        const dateString = date.innerHTML.substring(indexFirtDate + 18, indexLastDate);
        const dateReal = moment(dateString, "DD/MM/YYYY h:mm:ss a'");

        console.log("date", dateString);
        console.log("Teste", dateReal.toDate())

        for (var r = 0, n = table.rows.length; r < n; r++) {
            produto = {};
            produto.titulo = table.rows[r].cells[0].querySelector(".txtTit")?.innerHTML;
            produto.valor = parseFloat(table.rows[r].cells[1].querySelector(".valor")?.innerHTML.replace(",", "."));
            produto.date = dateReal.toDate();
            produtos.push(produto);
        }
    } catch (err) {
        console.log(err)
    }
    console.log("😬 - Produtos extraído!")
    console.log(produtos)
    return produtos;
};
export default importNFe;