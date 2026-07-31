
const input=document.getElementById("input");
const output=document.getElementById("output");
const status=document.getElementById("status");
document.getElementById("file").onchange=e=>{
 const f=e.target.files[0]; if(!f)return;
 const r=new FileReader();
 r.onload=()=>input.value=r.result;
 r.readAsText(f);
};
function formatJson(){try{const t=JSON.stringify(JSON.parse(input.value),null,2);output.innerHTML=highlight(t);status.className='status ok';status.innerHTML='🟢 Valid JSON';}catch(e){status.className='status err';status.textContent=e.message;}}
function minifyJson(){try{output.textContent=JSON.stringify(JSON.parse(input.value));status.className='status ok';status.textContent='Minified';}catch(e){status.className='status err';status.textContent=e.message;}}
function validateJson(){try{JSON.parse(input.value);status.className='status ok';status.innerHTML='🟢 JSON is valid';}catch(e){status.className='status err';status.textContent=e.message;}}
async function copyOutput(){await navigator.clipboard.writeText(output.textContent);status.className='status ok';status.textContent='Copied';}
function downloadJson(){const b=new Blob([output.textContent],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='formatted.json';a.click();URL.revokeObjectURL(a.href);}
function clearAll(){input.value='';output.textContent='';status.textContent='';status.className='status';input.focus();}

function escapeHtml(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
function highlight(json){
json=escapeHtml(json);
return json.replace(/("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*")(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+\-]?\d+)?/g,function(m){
let c="number";
if(/^"/.test(m)) c=/:$/.test(m)?"key":"string";
else if(/true|false/.test(m)) c="boolean";
else if(/null/.test(m)) c="null";
return '<span class="'+c+'">'+m+'</span>';
});
}
