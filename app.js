new Vue({
    el : "#app",
    data :{
        player_heal : 100,
        monster_heal:100,
        game_is_on : false,
        attack_multiple : 10,
        special_attack_multiple :25,
        monster_attack_multiple:15,
        heal_up_multiple:20,
        log_text : {
            attack: "oyuncu atağı",
            special_attack : "özel atak",
            monster_attack : "canavar atağı",
            heal_up : "ilk yardım",
            give_up : "oyuncu pest etti"
        },
        logs:[]
    },
    methods : {
        start_game : function(){
            this.game_is_on=true

        },
        attack : function(){
            var point = Math.ceil(Math.random()*this.attack_multiple);
            this.monster_heal-=point;
            this.monster_attack();
            this.add_to_log( {turn : "p" , text : this.log_text.attack   + point  });
        },
        special_attack : function(){
            var point = Math.ceil(Math.random()*this.special_attack_multiple);
            this.monster_heal-=point;
            this.monster_attack();
            this.add_to_log( {turn : "p" , text : this.log_text.special_attack   + point  });
        },
        heal_up : function(){
            var point = Math.ceil(Math.random()*this.heal_up_multiple);
            this.player_heal+=point;
            this.monster_attack();
            this.add_to_log( {turn : "p" , text : this.log_text.heal_up   + point  });
        },
        give_up : function(){
            this.player_heal=0;
            this.add_to_log( {turn : "p" , text : this.log_text.give_up   + point  });
        },
        monster_attack : function(){
            var point = Math.ceil(Math.random()*this.monster_attack_multiple);
            this.player_heal-=point;
            this.add_to_log( {turn : "m" , text : this.log_text.monster_attack   + point  });
        },
        add_to_log : function(log){
            this.logs.push(log);
        }
    },
    watch : {
        player_heal : function(value){
            if(value<=0){
                this.player_heal=0;
                if(confirm("Oyunu kaybettin tekrar denemek ister misin ?")){
                    this.player_heal=100;
                    this.monster_heal=100;
                    this.logs=[];
                }
            }else if(value>=100){
                this.player_heal=100;
            }
        },
        monster_heal : function(value){
            if(value<=0){
                this.monster_heal=0;
                if(confirm("Oyunu kazandın tekrar denemek ister misin ?")){
                    this.player_heal=100;
                    this.monster_heal=100;
                    this.logs=[];
                }
            }
        }
    },
    computed : {
        user_progress : function(){
            return {
                width : this.player_heal + "%"
            }
        },
        monster_progress : function(){
            return {
                width : this.monster_heal + "%"
            }
        }
    }
})