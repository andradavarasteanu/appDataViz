var xreq=new XMLHttpRequest();
xreq.open("GET",'./media/eurostat.json',false);
xreq.send(null);
var jsonObject=JSON.parse(xreq.responseText);

function aplicatie(){

    let tari= ["BE", "BG", "CZ", "DK", "DE", "EE", "IE", "EL", "ES",
    "FR", "HR", "IT", "CY", "LV", "LT", "LU", "HU", "MT", "NL", "AT", "PL", "PT", "RO", "SI", "SK", "FI", "SE" ]
  let ani=["2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"];
  


    let butonTabel=document.querySelector("#btnTabel");
    function medSV(anSelectat){
        let svtotal=0;
        for(let i=0;i<ani.length;i++){
            for(let j=0;j<jsonObject.length;j++){
                if(jsonObject[j].an==anSelectat && ani[i]==anSelectat){
                    if(jsonObject[j].indicator=='SV'){
                        svtotal+=jsonObject[j].valoare;
                    }
                }
            }
        }
       
        
      return svtotal/tari.length;
    }

    function medPOP(anSelectat){
        let poptotal=0;
        for(let i=0;i<ani.length;i++){
            for(let j=0;j<jsonObject.length;j++){
                if(jsonObject[j].an==anSelectat && ani[i]==anSelectat){
                    if(jsonObject[j].indicator=='POP'){
                        poptotal+=jsonObject[j].valoare;
                    }
                }
            }
        }
       
        return poptotal/tari.length;
        
    }
    function medPIB(anSelectat){
        let pibtotal=0;
        for(let i=0;i<ani.length;i++){
            for(let j=0;j<jsonObject.length;j++){
                if(jsonObject[j].an==anSelectat && ani[i]==anSelectat){
                    if(jsonObject[j].indicator=='PIB'){
                        pibtotal+=jsonObject[j].valoare;
                    }
                }
            }
        }
        
        return pibtotal/tari.length;
        
    }
  
   
    function buildTable(){
    let anSelectat=document.querySelector('select').value;
  
        var table=document.querySelector('table');
        var rand=table.insertRow(0);
        
        rand.insertCell(0).outerHTML="<th>Tara</th>";
        rand.insertCell(1).outerHTML="<th>SV</th>";
        rand.insertCell(2).outerHTML="<th>POP</th>";
        rand.insertCell(3).outerHTML="<th>PIB</th>";
        rand.style.backgroundColor='rgb(245,245,220)';
        rand.style.color='rgb(160,160,160)'
        let mediaSperantei=medSV(anSelectat);
        console.log(mediaSperantei);
        
        for(let k=0;k<tari.length;k++){
            for(let i=0;i<jsonObject.length;i++)
            {
                if(jsonObject[i].tara==tari[k] && jsonObject[i].an==anSelectat){
                             if(jsonObject[i].indicator=='SV'){
                                 var SV=jsonObject[i].valoare;
                               }else 
                               if(jsonObject[i].indicator=='POP'){
                                 var POP=jsonObject[i].valoare;
                                }else
                               if(jsonObject[i].indicator=='PIB'){
                                var PIB=jsonObject[i].valoare;
                           }
                             }  
            }
            console.log(tari[k]+" "+"SV:"+SV+""+"POP:"+""+POP+""+"PIB:"+PIB)

           var row=table.insertRow(k+1);
           var celula=row.insertCell(0);
           celula.style.backgroundColor='rgb(245,245,220)'
           celula.style.width='200px';

           celula.innerHTML=`${tari[k]}`
           var celula=row.insertCell(1);
           if(SV>medSV(anSelectat)){
            celula.style.backgroundColor='green';
           }else
           if(SV<medSV(anSelectat)){
            celula.style.backgroundColor='red';
           }
           
           celula.innerHTML=`${SV}`
          
           var celula=row.insertCell(2);
           if(POP>medPOP(anSelectat)){
            celula.style.backgroundColor='green';
           }else
           if(POP<medPOP(anSelectat)){
            celula.style.backgroundColor='red';
           }

           celula.innerHTML=`${POP}`
           var celula=row.insertCell(3);
           if(PIB>medPIB(anSelectat)){
            celula.style.backgroundColor='green';
           }else
           if(PIB<medPIB(anSelectat)){
            celula.style.backgroundColor='red';
           }
           celula.innerHTML=`${PIB}`
         

                    
          }

        table.style.border='2px solid';
        table.style.width='100px'
      document.querySelector('body').style.backgroundColor="black";
        
         

    }

    butonTabel.addEventListener('click',buildTable);


}
 document.addEventListener('DOMContentLoaded',aplicatie);