/**
 * this function retrieves data from the `<input>` tags on the page,
 * transforms the values into a `<tr>` element and appends the `<tr>` to
 * the `<tbody>` element of the `<table>`
 */
function add_record() {

    // this is an example on how to get the value of an `<input>` tag
    //   you do not have to use this layout
    const input_name = document.getElementById("name");
    const value_name = input_name.value;
    const input_id = document.getElementById("id");
    const value_id = input_id.value;
    const input_gpa = document.getElementById("gpa");
    const value_gpa = input_gpa.value;
    if(value_name===""||value_id===""||value_gpa==="")
    {
        return;
    }
    const tr=document.createElement("tr")
    const td_name=document.createElement("td");
    td_name.textContent=value_name;
    tr.appendChild(td_name);

    const td_id=document.createElement("td");
    td_id.textContent=value_id;
    tr.appendChild(td_id);

    const td_gpa=document.createElement("td");
    td_gpa.textContent=value_gpa;
    tr.appendChild(td_gpa);

    const tbody=document.getElementById("chart").getElementsByTagName("tbody")[0];
    tbody.appendChild(tr)

    input_name.value="";
    input_id.value="";
    input_gpa.value='';

    // TO DO ...

}