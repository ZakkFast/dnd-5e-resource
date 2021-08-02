const apiurl = 'https://www.dnd5eapi.co/api/'
$(document).ready(function(){
    function getRaces () {
        $.ajax({
            type: 'GET',
            url: `${apiurl}races`,
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
                        url: `${apiurl}races/${selectedVal}`,
                        dataType: 'json',
                        success: function(data){
                            console.log(data)
                            $('#contentContainer').html(`
                            <div class='container'>
                                <h3>${data.name}</h3>
                                <p>Size: ${data.size_description}</p>
                                <p>Age: ${data.age}</p>
                                <p>Speed: ${data.speed}
                                <p>Languages: ${data.language_desc}
                                <p>Alignment: ${data.alignment}</p>
                                <ul id='traits'>
                                Traits:
                                </ul>
                                <ul id='startProf'>
                                Starting Proficiencies:
                                </ul>
                                <ul id='abilityBns'>
                                Ability Bounses:
                                </ul>
                                <ul id='subraces'>
                                Subraces:
                                </ul>
                            </div>
                            `)
                            if(data.traits.length > 0) {
                            data.traits.forEach(traits => {
                                let traitsLi = $(`<li class='descli'>${traits.name}</li>`)
                                $('#traits').append(traitsLi)
                            });
                            } else {
                                let traitsLi = $(`<li class='descli'>None</li>`)
                                $('#traits').append(traitsLi)
                            }
                            if(data.starting_proficiencies.length > 0){
                                data.starting_proficiencies.forEach(startProf => {
                                    let startProfEl = $(`<li class='descli'>${startProf.name}</li>`)
                                    $('#startProf').append(startProfEl)
                                })
                            } else {
                                let startProfEl = $(`<li class='descli'>None</li>`)
                                $('#startProf').append(startProfEl)
                            }
                            if(data.subraces.length > 0){
                                data.subraces.forEach(subraces => {
                                    let subraceEl = $(`<li class='descli'>${subraces.name}</li>`)
                                    $('#subraces').append(subraceEl)
                                })
                            } else {
                                let subraceEl = $(`<li class='descli'>None</li>`)
                                $('#subraces').append(subraceEl)
                            }
                            data.ability_bonuses.forEach(ability_bonuses => {
                                let abilityBnsEl = $(`<li class='descli'>${ability_bonuses.ability_score.name}: ${ability_bonuses.bonus}</li>`)
                                $('#abilityBns').append(abilityBnsEl)
                            })
                        }
                    })
                })
            }
        })
    }
    getRaces()
})