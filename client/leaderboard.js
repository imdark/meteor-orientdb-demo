Meteor.methods({
  'incScore': function(id, amount){
    var originalIndex;
    oplayers.forEach(function(player, index){
      if(player.id === id){
        originalIndex = index;
        oplayers[index].score += amount;
        oplayers.changed();
      }
    });

    // Reverse changes if needed (due to resorting) on update
    oplayers.addEventListener('update.incScoreStub', function(index, msg){
      if(originalIndex !== index){
        oplayers[originalIndex].score -= amount;
      }
      oplayers.removeEventListener('update.incScoreStub');
    });
  }
});


Template.leaderboard.helpers({
  oplayers: function () {

    return oplayers.reactive();
  },
  selectedName: function () {
    oplayers.depend();
    var player = oplayers.filter(function(player){
      return player.id === Session.get("selectedPlayer");
    });
    return player.length && player[0].name;
  }
});

Template.leaderboard.events({
  'click .inc': function () {
    Meteor.call('incScore', Session.get("selectedPlayer"), 5);
  }
});

Template.player.helpers({
  selected: function () {
    return Session.equals("selectedPlayer", this.id) ? "selected" : '';
  }
});

Template.player.events({
  'click': function () {
    //Meteor.call('incScore');
    //Meteor.call('delScore');
    Meteor.call('updScore', {params:{score:61}});
  }
});
