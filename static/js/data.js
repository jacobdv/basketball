let dropdownMenu = d3.select('#schoolNameSelection');
d3.json('http://127.0.0.1:5000/stats/').then(data => {
    data.forEach(school => {
        dropdownMenu.append('option').text(school.school)
    })
})