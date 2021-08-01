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
                            <div class='container' id='containerEl'>
                                <h3>${data.name}</h3>
                                <p>Size: ${data.size}</p>
                                <p>Challenge Rating: ${data.challenge_rating}</p>
                                <p>Experience: ${data.xp}</p>
                                <p>Armor Class: ${data.armor_class}</p>
                                <p>Hit Points: ${data.hit_points}</p>
                                <p>Hit Dice: ${data.hit_dice}</p>
                                <ul>Attributes:
                                <li class='descli'>Str ${data.strength}</li> 
                                <li class='descli'>Dex ${data.dexterity}</li> 
                                <li class='descli'>Con ${data.constitution}</li> 
                                <li class='descli'>Int ${data.intelligence}</li>
                                <li class='descli'>Wis ${data.wisdom}</li> 
                                <li class='descli'>Cha ${data.charisma}</li>
                                </ul>
                                <ul id='actionEl'>
                                Actions:
                                </ul>
                                <ul id='legendaryActionsEl'>
                                </ul>
                            `)
                            for(i = 0; i < data.actions.length; i++){
                                let actionData = $(`<li class='descli'>${data.actions[i].name}: ${data.actions[i].desc}</li>`)

                                $('#actionEl').append(actionData)
                            }
                            if(data.legendary_actions.length > 0){
                                $(`#legendaryActionsEl`).text('Legendary Actions:')
                            }
                            for(i = 0; i < data.legendary_actions.length; i++){
                                let legendaryAction = $(`<li class='descli'>${data.legendary_actions[i].name}: ${data.legendary_actions[i].desc}</li>`)

                                $('#legendaryActionsEl').append(legendaryAction)
                            }
                        }
                    })
                })
            }
        })
    } 
    getMonster()
})