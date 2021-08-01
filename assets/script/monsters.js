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
                            function capitalizeFirstLetter(string) {
                                return string.charAt(0).toUpperCase() + string.slice(1);
                              }
                            let creatureType = capitalizeFirstLetter(data.type)
                            let datalignment = capitalizeFirstLetter(data.alignment);
                            console.log(data)
                            $('#contentContainer').html(`
                            <div class='container' id='containerEl'>
                                <h3>${data.name}</h3>
                                <p>Type: ${creatureType}</p>
                                <p>Size: ${data.size}</p>
                                <p>Alignment: ${datalignment}</p>
                                <p>Challenge Rating: ${data.challenge_rating}</p>
                                <p>Experience: ${data.xp}</p>
                                <p>Armor Class: ${data.armor_class}</p>
                                <p>Hit Points: ${data.hit_points}</p>
                                <p>Hit Dice: ${data.hit_dice}</p>
                                <ul id='speedStats'>
                                    Speed
                                </ul>
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
                            if(data.speed.walk){
                                let walkSpeed = $(`<li class='descli'>Walk: ${data.speed.walk}</li>`)
                                $('#speedStats').append(walkSpeed)
                            } if(data.speed.fly){
                                let flySpeed = $(`<li class='descli'>Fly: ${data.speed.fly}</li>`)
                                $('#speedStats').append(flySpeed)
                            }
                            if(data.speed.swim){
                                let swimSpeed = $(`<li class='descli'>Swim: ${data.speed.swim}</li>`)
                                $('#speedStats').append(swimSpeed)
                            }
                            if(data.speed.burrow){
                                let burrowSpeed = $(`<li class='descli'>Burrow: ${data.speed.burrow}</li>`)
                                $('#speedStats').append(burrowSpeed)
                            // } else {
                            //     let walkSpeed = $(`<li class='descli'>Walk: ${data.speed.walk}</li>`)
                            //     $('#speedStats').append(walkSpeed)
                            }
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