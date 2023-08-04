

const convertbtn=document.getElementById("convertbtn")
const  debugbtn=document.getElementById("debug")
const codearea =document.getElementById("codearea")
const outputarea =document.getElementById("output")
const codeLang =document.getElementById("code")
const baseurl ="https://uptight-tick-girdle.cyclic.app"
const languagearea =document.getElementById("language")

require.config({
	paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor/min/vs" },
});
require(['vs/editor/editor.main'], function() {

  const editor = monaco.editor.create(document.getElementById('codearea'), {
    value: [
      '// Welcome to the Monaco Editor Playground!',
      '',
      'function greet() {',
      '  return "Hello, world!";',
      '}'
    ].join('\n'),
    language: 'javascript',
    theme: 'vs-dark', 
  });

 
  editor.onDidChangeModelContent(() => {
    const code = editor.getValue();
    
    console.log('User code:', code);
  });

  convertbtn.addEventListener("click",()=>{
    outputarea.innerHTML=`s`
    const subject ={
        code:editor.getValue()||"javascript",
        language:codeLang.value
    }
    fetch(`${baseurl}/convert`,{
        method:"POST",
        headers:{
            "content-type":"Application/JSON"
        },
        body:JSON.stringify(subject)
    })
    .then((res)=> res.json())
    .then((result)=>{
        console.log(result);
        const respcode =JSON.parse(result.content)
   
        outputarea.innerHTML=null
        outputarea.innerHTML=`
        <h2>Compiled Code</h2>
        <div id="outputCode" >${respcode.code}</div>
        `
        console.log(respcode.code)
      

    })
})

debugbtn.addEventListener("click",()=>{
  
  const subject ={
    code:editor.getValue(),
    language:languagearea.value || "javascript"
}
  fetch(`${baseurl}/debug`,{
    method:"POST",
    headers:{
        "content-type":"Application/JSON"
    },
    body:JSON.stringify(subject)
})  .then((res)=> res.json())
.then((result)=>{
    console.log(result);
    const respcode =JSON.parse(result.content)

    outputarea.innerHTML=null
    outputarea.innerHTML=
    `
    <h2>Compiled Code</h2>
    <div id="outputCode" >${respcode.numberError ? respcode.error : respcode.extra}</div>
    `
    console.log(respcode)
  

})
})

});




