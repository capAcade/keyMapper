import Phaser from 'phaser';

function getDeepKeys(obj) {
    var keys = [];
    for(var key in obj) {
        keys.push(key);
        if(typeof obj[key] === "object") {
            var subkeys = getDeepKeys(obj[key]);
            keys = keys.concat(subkeys.map(function(subkey) {
                return key + "." + subkey;
            }));
        }
    }
    return keys;
}

function* test(list){
    yield* list;
}

class KeySelectScreen extends Phaser.Scene {
    constructor() {
        super({key: 'keySelectScreen', active: true})
        this.iterationDone = false;
        this.keys = {
            playerOne: {
                up: '',
                down: '',
                left: '',
                right: '',
                green: '',
                black: '',
                white: '',
                blueBelowWhite: '',
                topRightBlue: '',
                buttomRightBlue: ''
            },
            playerTwo: {
                up: '',
                down: '',
                left: '',
                right: '',
                green: '',
                black: '',
                white: '',
                blueBelowWhite: '',
                topRightBlue: '',
                buttomRightBlue: ''
            },
            pinBallLeft: '',
            pinBallRight: '',
            OnePlayerSelection: '',
            TwoPlayerSelection: ''
        }
        this.questions = getDeepKeys(this.keys).filter((element) =>{
            console.log(element,'playerTwo' )
            if(element === 'playerTwo'){
                return false
            }
            if(element === 'playerOne'){
                return false
            }
            return true
        })
        this.questionIterator = test(this.questions);
    }
    preload() {
    

    }
    create() {
        this.keycurrentKey = this.questionIterator.next().value;
        this.add.text(0, 0, 'Just hit the buttons when it says undefined hit an other key and you will move back in 3 seconds', { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' });
        this.questionText = this.add.text(200, 80, `Enter following key:${this.keycurrentKey}`, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' });
        this.keyText = this.add.text(0, 20, `keys: ${JSON.stringify(this.keys, null,4)}`, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' });
        this.input.keyboard.on('keydown', this.keyPushed), this;
    }
    update () {
        this.keyText.setText(`keys: ${JSON.stringify(this.keys, null,4)}`);
        if(!this.scene.iterationDone){
            this.questionText.setText(`Enter following key:${this.keycurrentKey}`);
        }else{
            this.scene.questionText.setText(`Yeey all keys are added lets move back!`);
        }
    }
    keyPushed (key) {
        if(!this.scene.iterationDone){
            let path = this.scene.keycurrentKey.split('.');

            if(path.length === 2){
                this.scene.keys[path[0]][path[1]] = key.keyCode;
            } else {
                this.scene.keys[path[0]] = key.keyCode;
            }
            let element = this.scene.questionIterator.next();

            this.scene.keycurrentKey = element.value;
            this.scene.iterationDone = element.done;
        }else {
            localStorage.setItem("capManKeys", JSON.stringify(this.scene.keys));
            setTimeout(()=>{history.back()}, 3000)
        }

    }
}

const config = {
  type: Phaser.AUTO,
  parent: 'capman-key-mapper',
  width: screen.width,
  height: screen.height,
  physics:{
    default: 'arcade',
    arcade: {
      
      debug: false
    }
  },
  scene: [KeySelectScreen]
};

const game = new Phaser.Game(config);
