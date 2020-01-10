        //declare html text elements and a couple of global variables
        var p=document.getElementById("display");
        var g=document.getElementById("guesses");
        var m=document.getElementById("message");
        var guessremain = 8;
        var hits=0;
        
        m.innerHTML = "Try to sink the Battleship of the Screaming Seas!";
        g.innerHTML = "Guesses remaining: " + guessremain;
        
        //initialize two separate 20 unit arrays; one for keeping track of tiles, another for displaying results
        var gameboard = [];
        for(i=0;i<=19;i++){
            gameboard[i]=0;
        }
        var gamedisplay = [];
        for(i=0;i<=19;i++){
            gamedisplay[i]=0;
        }
        
        //function that selects a random tile from 1 to 18 for the ship's center point and sets ship locations as "2"
        function assembleBoard() {
            rand = Math.floor(Math.random() * (gameboard.length-2)) +1;
            gameboard[rand-1] = 2;
            gameboard[rand] = 2;
            gameboard[rand+1] = 2;
        }
        assembleBoard();
        
        //set up the gamedisplay array
        for (i=0;i<gamedisplay.length;i++){
            gamedisplay[i] = "<span class='tile'>&nbsp;</span>";
        }
        p.innerHTML = gamedisplay.join("");
        
        //main game loop
        for (i = 1; i < 9; i++) {
            //a couple of required variables that need to be reset each loop
            var valid=0;
            var guess=0;
                        
            //while loop guaranteeing correct input format and compensating for coordinates already selected as well as coordinates outside of the board
            while (valid==0) {
                guess = prompt("Make a coordinate guess");
                guess = parseInt(guess);
                if ((gameboard[guess-1]==1) || (gameboard[guess-1]==3)) {
                    alert("You already shot this spot idiot");
                } else if ((guess > 20) || (guess < 1)) {
                    alert("There is nothing beyond the coordinates of the board, try again");
                } else if ((guess >= 1) || (guess <= 20)) {
                    valid++;
                } else {
                    alert("incorrect input");
                }
            }
            
            //this if statement checks whether the validated guess was a miss or a hit, and updates the gameboard array. hits are also kept track of
            if (gameboard[guess-1]==0) {
                m.innerHTML = "Your cannonball went out into empty ocean!";
                gameboard[guess-1] = 1;
                gamedisplay[guess-1] = "<span class='emptyhit'>&nbsp;</span>";      
            } else if (gameboard[guess-1]==2) {
                m.innerHTML = "Ouch! That's a hit!";
                gameboard[guess-1] = 3;
                gamedisplay[guess-1] = "<span class='shiphit'>&nbsp;</span>";
                hits++;
            }
            
            //one guess is gone. Display the updated guess count and update the board display
            guessremain--;
            g.innerHTML = "Guesses remaining: " + (guessremain);
            p.innerHTML = gamedisplay.join("");
            
            //at the end of the main game loop we check to see whether the ship is sunk, and break the loop if this is the case
            if (hits==3){
                break;
            }       
        }
        //the final evaluation which can be reached through breaking the loop (win) or exhausting guesses (loss)
        if (hits==3) {
            m.innerHTML = "You won... this time";
        } else if (hits > 0) {
            m.innerHTML = "Almost there... but not quite";
        } else {
            m.innerHTML = "Complete failure...";
        }