let selectionContent = d3.select('.selectionContent');
d3.json(`${pageLink}stats/`).then(data => {
    data.forEach(school => {
        selectionContent.append('p').text(school.school).classed('dropdownSchool', true);
    });
    let randomNumber = Math.floor(Math.random() * data.length);
    displayData(data[randomNumber].school);
});

function searchSchools() {
    selectionContent.classed('show',true);
    let input, filter, ul, li, a, i;
    input = d3.select('#selectionSearch');
    filter = (input._groups[0][0].value).toUpperCase();
    searchContent = d3.selectAll('.dropdownSchool')._groups[0];
    for (i = 0; i< searchContent.length; i++) {
        txtValue = searchContent[i].textContent || searchContent[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            searchContent[i].style.display = "";
        } else {
            searchContent[i].style.display = "none";
        };
    };
    let schools = d3.selectAll('.dropdownSchool')
    schools.on('click', function () {
        let school = this.textContent;
        input._groups[0][0].value = '';
        input._groups[0][0].placeholder = 'Search Schools...';
        selectionContent.classed('show',false);
        displayData(school);
    })
};

function displayData(school) {
    d3.json(`${pageLink}stats/${school}/`).then(data => {
        data = data[0];
        let pageOneStats = {
            'Games': data.games,
            'SRS': data.srs,
            'Pace': data.pace,
            'FGpct': `${data.fg_pct * 100}%`,
            '3Ppct': `${data.three_p_pct * 100}%`,
            'FTpct': `${data.ft_pct * 100}%`,
            'PPG': (data.t_points / data.games).toFixed(1),
            'RPG': (data.trb / data.games).toFixed(1),
            'APG': (data.ast / data.games).toFixed(1),
            'BPG': (data.blk / data.games).toFixed(1),
            'SPG': (data.stl / data.games).toFixed(1),
            'TOVPG': (data.tov / data.games).toFixed(1)
        };
        let constantStats = {
            'school': data.school,
            'away_losses': data.a_losses,
            'away_wins': data.a_wins,
            'conference_losses': data.c_losses,
            'conference_wins': data.c_wins,
            'games': data.games,
            'home_losses': data.h_losses,
            'home_wins': data.h_wins,
            'losses': data.losses,
            'minutes': data.minutes,
            'rank': data.rank,
            'sos': data.sos,
            'srs': data.srs,
            'total_points': data.t_points,
            'win_percentage': data.w_pct,
            'wins': data.wins
        };
        let basicStats = {
            'assists': data.ast,
            'blocks': data.blk,
            'field_goals': data.fg,
            'field_goal_attempts': data.fga,
            'free_throws': data.ft,
            'free_throw_attempts': data.fta,
            'offensive_rebounds': data.orb,
            'pace': data.pace,
            'personal_fouls': data.pf,
            'possessions': data.poss,
            'steals': data.stl,
            'three_pointers': data.three_p,
            'three_point_attempts': data.three_pa,
            'turnovers': data.tov,
            'total_rebounds': data.trb,
            'two_pointers': data.two_p,
            'two_point_attempts': data.two_pa
        };
        let advancedStats = {
            'assist_percentage': data.ast_pct,
            'assists_per_turnover': data.ast_per_tov,
            'block_percentage': data.blk_pct,
            'defensive_rebound_success_percentage': data.drs_pct,
            'effective_field_goal_percentage': data.efg_pct,
            'field_goal_percentage': data.fg_pct,
            'free_throw_percentage': data.ft_pct,
            'free_throws_per_field_goal_attempt': data.ft_per_fga,
            'free_throw_attempts_attempt_rate': data.fta_ar,
            'offensive_rating': data.off_rtg,
            'offensive_rebound_percentage': data.orb_pct,
            'offensive_rebound_success_percentage': data.ors_pct,
            'steal_percentage': data.stl_pct,
            'three_point_attempt_rate': data.three_p_ar,
            'three_point_percentage': data.three_p_pct,
            'turnover_percentage': data.tov_pct,
            'total_rebound_percentage': data.trb_pct,
            'total_rebound_success_percentage': data.trs_pct,
            'true_shooting_percentage': data.ts_pct,
            'two_point_percentage': data.two_p_pct
        };
        let opponentStats = {
            'assists': data.o_ast,
            'blocks': data.o_blk,
            'field_goals': data.o_fg,
            'field_goal_attempts': data.o_fga,
            'free_throws': data.o_ft,
            'free_throw_attempts': data.o_fta,
            'offensive_rebounds': data.o_orb,
            'pace': data.o_pace,
            'personal_fouls': data.o_pf,
            'points': data.o_points,
            'possessions': data.o_poss,
            'steals': data.o_stl,
            'three_pointers': data.o_three_p,
            'three_point_attempts': data.o_three_pa,
            'turnovers': data.o_tov,
            'total_rebounds': data.o_trb,
            'two_pointers': data.o_two_p,
            'two_point_attempts': data.o_two_pa
        }
        let opponentAdvancedStats = {
            'assist_percentage': data.o_ast_pct,
            'assists_per_turnover': data.o_ast_per_tov,
            'block_percentage': data.o_blk_pct,
            'defensive_rebound_success_percentage': data.o_drs_pct,
            'effective_field_goal_percentage': data.o_efg_pct,
            'field_goal_percentage': data.o_fg_pct,
            'free_throw_percentage': data.o_ft_pct,
            'free_throws_per_field_goal_attempt': data.o_ft_per_fga,
            'free_throw_attempts_attempt_rate': data.o_fta_ar,
            'offensive_rating': data.o_off_rtg,
            'offensive_rebound_percentage': data.o_orb_pct,
            'offensive_rebound_success_percentage': data.o_ors_pct,
            'steal_percentage': data.o_stl_pct,
            'three_point_attempt_rate': data.o_three_p_ar,
            'three_point_percentage': data.o_three_p_pct,
            'turnover_percentage': data.o_tov_pct,
            'total_rebound_percentage': data.o_trb_pct,
            'total_rebound_success_percentage': data.o_trs_pct, 
            'two_point_percentage': data.o_two_p_pct
        }

        // Selecting HTML elements to be updated with stats.
        // Stats Header
        d3.select('#schoolName')._groups[0][0].textContent = school;
        d3.select('#totalRecord')._groups[0][0].textContent = `Record: ${constantStats.wins} - ${constantStats.losses}`;
        d3.select('#conferenceRecord')._groups[0][0].textContent = `Conf. Record: ${constantStats.conference_wins} - ${constantStats.conference_losses}`;
        
        // Page One Stats
        let pageOneStatsArray = ['Games','SRS','Pace','FGpct','3Ppct','FTpct','PPG','RPG','APG','BPG','SPG','TOVPG'];
        let constantStatDiv = d3.select('#constantStatsDiv');
        pageOneStatsArray.forEach(stat => {
            let thisBox = constantStatDiv.append('div').classed('dataBox', true);
            thisBox.append('p').classed('dataBoxName', true).text(stat);
            thisBox.append('p').classed('dataBoxStat', true).attr('id',`stat${stat}`).text(pageOneStats[stat]);
        });
    })
}

d3.selectAll('.statPageOption').on('click', function() {
    console.log(this.textContent);
    d3.selectAll('.statsDivs').attr('class','hide');
    d3.select(`#${this.textContent}StatsDiv`).attr('class','show');
})