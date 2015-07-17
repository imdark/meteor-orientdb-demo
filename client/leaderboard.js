Meteor.methods({
  'incScore': function(id, amount){
    var originalIndex;
    oplayers.forEach(function(player, index) {
      if(player.id === id) {
        originalIndex = index;
        oplayers[index].score += amount;
        oplayers.changed();
      }
    });

    // Reverse changes if needed (due to resorting) on update
    // oplayers.addEventListener('update.incScoreStub', function(index, msg){
    //   if(originalIndex !== index){
    //     oplayers[originalIndex].score -= amount;
    //   }
    //   oplayers.removeEventListener('update.incScoreStub');
    // });
  }
});


Template.leaderboard.helpers({
  oplayers: function () {

    return oplayers.reactive();
  },
  selectedName: function () {
    oplayers.depend();
    var player = oplayers.filter(function(player){
      return player['@rid'] === Session.get("selectedPlayer")['@rid'];
    });
    return player.length && player[0].name;
  }
});

Template.leaderboard.events({
  'click .inc': function () {
    var player = oplayers.filter(function(player){
      return player['@rid'] === Session.get("selectedPlayer")['@rid'];
    })[0];

    player.score += 5
    Meteor.call('incScore', { rid: player['@rid'], score: player.score });
  }
});

Template.player.helpers({
  selected: function () {
    return Session.equals("selectedPlayer", this) ? "selected" : '';
  }
});

Template.player.events({
  'click': function () {
    Session.set("selectedPlayer", this)
    //Meteor.call('incScore');
    //Meteor.call('delScore');
    // Meteor.call('updScore', {params:{score:61}});
  }
});
