$(document).ready(function() {

$("#donates").hide();
//Дофига проверок и AJAX
$("#buy").click(function(){
if($('#account').length && $('#account').val().length){
 var name = $("#account").val();
 serversid.forEach(function(currentValue){
  if(currentValue == $("#select").val()){
  if($("#" + currentValue).val() != 0){
   $.ajax({
   	method: "GET",
   	url: "https://api.mcpetrade.com/shop.checkSurcharge",
   	data: "shop=" + shopid + "&server=" + currentValue + "&product=" + $("#" + currentValue).val() + "&username=" + name,
    success: function(data){
     data = JSON.parse(data);
     
     if(data.status == "success"){
      $("#buy").html("Купить за " + data.response.price + " рублей");
      $.ajax({
    	method: "GET",
   	    url: "https://api.mcpetrade.com/shop.createPayment",
   	    data: "shop=" + shopid + "&server=" + currentValue + "&product=" + $("#" + currentValue).val() + "&username=" + name,
        success: function(data){
         data = JSON.parse(data);
         if(data.status == "success"){
          $("#buy").click(function(){
           location.href=data.response;
          });
         }
        }
      });
     }
    }
   });
  }
}
});
}else{
 alert("Введите Ник!");
}
});



$("#select").change(function(){
 serversid.forEach(function(currentValue){
  if(currentValue == $("#select").val()){
   $("#" + currentValue).show();
   $("#donates").show(500);
  }else{
   $("#" + currentValue).hide();
  }
 });

});



});
