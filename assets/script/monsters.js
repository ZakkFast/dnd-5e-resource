const apiurl = 'https://www.dnd5eapi.co/api/'
$(document).ready(function(){
    function getMonster (){
        $.ajax({
            type: 'GET',
            url: `${apiurl}monsters`,
            dataType: 'json',
            success: function(data){
                let selectEl = $(`<select></select>`)
                for (i = 0; i < data.results.length; i++){
                    let divContainer = $(`#divDrop`)
                    let optionEl = $(`<option value='${data.results[i].index}'>${data.results[i].name}</option>`)
                    divContainer.append(selectEl)
                    selectEl.append(optionEl)
                }
                $('#divDrop').change(function(){
                    let selectedVal = $(this).find(':selected').val()
                    $.ajax({
                        type: 'GET',
                        url: `${apiurl}monsters/${selectedVal}`,
                        dataType: 'json',
                        success: function(data){
                            console.log(data)
                            $('#contentContainer').html(`
                            <div class='container'>
                                <h3>${data.name}</h3>
                                <p>Size: ${data.size}</p>
                                <p>Challenge: ${data.challenge_rating}</p>
                                <ul>Attributes:</u>
                                <li>Str ${data.strength}</li> 
                                <li>Dex ${data.dexterity}</li> 
                                <li>Con ${data.constitution}</li> 
                                <li>Int ${data.intelligence}</li>
                                <li>Wis ${data.wisdom}</li> 
                                <li>Cha ${data.charisma}</li>
                            `)
                        }
                    })
                })
            }
        })
    } 
    getMonster()
})