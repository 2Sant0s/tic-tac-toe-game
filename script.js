var divElement = document.querySelector('div');
var tableElement = document.querySelector('table');

var Game = {
	start() {
		this.field = [
			['', '', ''],
			['', '', ''],
			['', '', '']
		];

		this.currentPlayer = '❌';
		this.isFinished = false;
		this.round = 0;
		this.render();
	},
	nextPlayer() {
		this.currentPlayer = this.currentPlayer === '❌' ? '⚫' : '❌';
	},
	setField(line, column) {
		if (!this.isFinished && this.field[line][column] === '') {
			this.field[line][column] = this.currentPlayer;
			this.nextPlayer();
			this.round++;
			this.render();
		}
	},
	isGameOver() {
		var field = this.field,
			rows = 3,
			cols = 3,
			totalRow = 0,
			totalCol = 0;
		for (var i = 0; i < rows; i++) {
			totalRow = 0;
			totalCol = 0;

			for (var j = 0; j < cols; j++) {
				if (field[i][j] === '❌') {
					totalRow++;
				}
				if (field[i][j] === '⚫') {
					totalRow--;
				}
				if (field[j][i] === '❌') {
					totalCol++;
				}
				if (field[j][i] === '⚫') {
					totalCol--;
				}
			}
			if (totalRow === 3 || totalCol === 3) {
				return '❌'
			}
			if (totalRow === -3 || totalCol === -3) {
				return '⚫'
			}
		}
		if (field[0][0] !== '' && field[0][0] === field[1][1] && field[1][1] === field[2][2]) {
			return field[0][0];
		}
		if (field[0][2] !== '' && field[0][2] === field[1][1] && field[1][1] === field[2][0]) {
			return field[0][2];
		}
		if (this.round === rows * cols) {
			return 'Ninguém...';
		}

	},
	render() {
		var winner = this.isGameOver();
		divElement.textContent = winner ? `Vencedor: ${winner}` : `Jogador: ${this.currentPlayer}`;

		if (winner) {
			this.isFinished = true;
		}
		var template = '';
		this.field.forEach((line, lineIndex) => {
			template += '<tr>';
			line.forEach((column, columnIndex) => {
				template += `<td onclick="Game.setField(${lineIndex}, ${columnIndex})">${column}</td>`;
			})
			template += '</tr>'
		})
		tableElement.innerHTML = template;
	}
}

Game.start();