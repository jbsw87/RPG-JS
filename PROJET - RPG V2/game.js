const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')






let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Vous vous réveillez dans un endroit étrange et vous voyez une bague près de vous.',
    options: [
      {
        text: 'Ramasser la bague',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Laisser la bague',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Vous cherchez des réponses à votre situation lorsque vous rencontrez un marchand.',
    options: [
      {
        text: 'Echanger la bague contre une épée',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Echanger la bague contre un bouclier',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Ignorer le marchand',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'Après avoir quitté le marchand vous commencez à fatiguer et vous tombait sur une petite ville ou il y a un chateau.',
    options: [
      {
        text: 'Explorer le chateau',
        nextText: 4
      },
      {
        text: 'Trouver une chambre pour dormir',
        nextText: 5
      },
      {
        text: 'Trouvez du foin dans une étable pour dormir',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Vous êtes tellement fatigué que vous vous endormez en explorant le château et êtes tué dans votre sommeil.',
    options: [
      {
        text: 'Recommencer',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Sans argent pour acheter une chambre, vous entrez par effraction dans l auberge la plus proche et vous vous endormez. Le propriétaire de l auberge vous trouve et vous êtes enfermé en prison.',
    options: [
      {
        text: 'Recommencer',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Vous vous réveillez bien reposé et prêt à explorer le château .',
    options: [
      {
        text: 'Explorer le chateau',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'En explorant le château, vous tombez sur un horrible monstre sur votre chemin.',
    options: [
      {
        text: 'Fuir',
        nextText: 8
      },
      {
        text: 'Echanger la bague contre votre vie',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 9
      },
      {
        text: 'Se cacher derrière son bouclier',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Combattre',
        requiredState: (currentState) => currentState.sword,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Vous ne courrais pas assez vite et le monstre vous attrape facilement.',
    options: [
      {
        text: 'Recommencer',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Le monstre refuse et vous mange.',
    options: [
      {
        text: 'Recommencer',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Votre bouclier ne fait pas le poids face au monstre.',
    options: [
      {
        text: 'Recommencer',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Un dur combat en vue',

    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()
