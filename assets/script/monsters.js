const apiurl = 'https://www.dnd5eapi.co/api/'
$(document).ready(function(){
    function getMonster (){
        $.ajax({
            type: 'GET',
            url: `${apiurl}monsters`,
            dataType: 'json',
            success: function(data){
                console.log(data)
            }
        })
    } 
    getMonster()
})