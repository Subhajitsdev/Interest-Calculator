const interestType = {
    si:0,
    ci:1
}
let selectedInterest=interestType.si;
const SIButton=document.getElementsByClassName("si")[0];
const CIButton=document.getElementsByClassName("ci")[0];
const CIFrequency=document.getElementsByClassName("ci-freq")[0];
const resultWrapper=document.getElementsByClassName("result")[0];
const calculate=document.getElementsByClassName("btn")[0];
const reset1=document.getElementsByClassName("btn1")[0];


CIFrequency.style.display='none';
resultWrapper.style.display='none';

const selectedInterestType=(type) => {
    reset();
    selectedInterest=type;
    updateInterestFeature();
}

const reset=() => {
    const PA=document.getElementById("pa").value='';
    const IR=document.getElementById("ir").value='';
    const DY=document.getElementById("dy").value='';
    if(selectedInterest===interestType.ci){
        const FY=document.getElementById("fy").value='';

    }
    resultWrapper.style.display='none';


}

const updateInterestFeature = () => {
    if(selectedInterest===interestType.si){
        CIButton.classList.remove('active');
        SIButton.classList.add('active');
        CIFrequency.style.display='none';
    }else{
        SIButton.classList.remove('active');
        CIButton.classList.add('active');
        CIFrequency.style.display='block';
    }
}

const calculateAmount = () => {
    const PA=document.getElementById("pa").value;
    const IR=document.getElementById("ir").value;
    const DY=document.getElementById("dy").value;
    const FY=document.getElementById("fy").value;

    if(!PA || !IR|| !DY ||(window.getComputedStyle(CIFrequency).display!=="none"&& !FY)) {
        alert("All fields are required.");
        reset();
        return;
    }
    if(isNaN(PA) || isNaN(IR)|| isNaN(DY)||(window.getComputedStyle(CIFrequency).display!=="none"&& isNaN(FY))) {
        alert("All values must be numeric only.");
        reset();
        return;
    }
    const finalAmount=document.getElementsByClassName("total-amount")[0];
    const interestAmount=document.getElementsByClassName("total-interest")[0];
    let result=0;
    let interest=0;


    if(selectedInterest===interestType.si){
        result=PA*(1+(IR*DY)/100);
        interest=result-PA;

    }
    if(selectedInterest===interestType.ci){
       
        result=PA*Math.pow((1+(IR/(FY*100))),FY*DY);
        interest=result-PA;

    }
    resultWrapper.style.display='block';
    finalAmount.innerHTML=result;
    interestAmount.innerHTML=interest;

}



SIButton.addEventListener('click',() => {
    selectedInterestType(interestType.si);
})
CIButton.addEventListener('click',() => {
   
    selectedInterestType(interestType.ci);
    
})

calculate.addEventListener('click', calculateAmount);
reset1.addEventListener('click', reset);