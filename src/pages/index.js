import React, {useState} from 'react'
import { themeStyles, colors } from '../utils/theme'
import { Link, graphql } from 'gatsby'
import List from 'react-smooth-draggable-list'
import _ from 'lodash'
import Helmet from 'react-helmet'

const styles = {
  outer: {
    width: '100%',
    alignText: 'center',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: '500px',
    padding: '20px 5px',
    alignText: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: 'green',
    margin: '5px',
  },
  secondaryButton: {
    backgroundColor: 'red',
  },
  card: {
    padding: '5px',
    margin: '5px',
    border: '1px',
    backgroundColor: 'white',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignText: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: '0 8px 8px 0 rgba(205, 205, 205, 0.5)',
    width: '100%',
    fontSize: '0.8em',
}
}

// fetch("/.netlify/functions/process-payment", {
//   method: "POST",
//   body: JSON.stringify({
//     nonce,
//     total: this.getTotal() * 100,
//     cookieType,
//     quantity,
//     delivery,
//     firstName,
//     lastName,
//     email,
//     phone,
//     streetAddress,
//     city,
//     state,
//     postal,
//   }),
// })
// .then(response => {
//   console.log(response.json())
//   this.setState({ errorMessages: [], orderComplete: true  })
// })
// .catch(err => {
//   this.setState({ errorMessages: ['Something went wrong with your transaction. We apologize!'] })
// })

const ButtonComponent = ({ children, secondary, onClick }) => (
  <button
    css={[styles.button, secondary ? styles.secondaryButton : null]}
    onClick={onClick}
  >
    {children}
  </button>
)

class Index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentStep: 0,
      order: [0,1,2,3,4,5],
      showVideo: false
    }
  }

  componentDidMount() {
    if (typeof window != 'undefined') {
      window.addEventListener("touchend", this.handleMouseUp)
      window.addEventListener("mouseup", this.handleMouseUp)
    }
  }

  handleMouseUp = () => {
    if (_.isEqual(this.state.order, [3,1,0,5,2,4]) && !this.state.showVideo) {
      this.showVideo()
    }
  }

  onDecline = () => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')
  }

  onContact = () => {
    window.open('https://us02web.zoom.us/j/4887098749', '_blank')
  }

  onAdvanceStep = () => {
    this.setState({ currentStep: this.state.currentStep + 1 })
  }

  showVideo = () => {
    this.setState({ showVideo: true }, () => {
      if (typeof window != 'undefined') {
        window.scrollTo(0,document.body.scrollHeight)
      }
    })
  }

  renderStep0 = () => (
    <React.Fragment>
      <h1 css={{textAlign: 'center'}}>
        How would you like to cast the winner of Survivor 43?
      </h1>
      <ButtonComponent
        onClick={this.onAdvanceStep}
      >
        Oh yeah 💰💰
      </ButtonComponent>
      <ButtonComponent
        onClick={this.onDecline}
        secondary
      >
        Nah, let Yelton have it
      </ButtonComponent>
    </React.Fragment>
  )

  renderStep1 = () => {
    const items = [
      {text: "Made $30k in 3 months selling door to door", order: 2},
      {text: "Talked with 50+ strangers per day for 2yrs in Latvia as a missionary", order: 1},
      {text: "Traveled to 18 countries in 6 months with my wife and 1yr-old while working full time at night (sleeping 2-3 hrs)", order: 4},
      {text: "Turned down a full-ride to West Point", order: 0},
      {text: "Leading Engineering at a tech startup after teaching myself to code 4yrs ago", order: 5},
      {text: "Networked my way into an Investment Banking job", order: 3},
    ]
    return (
      <div css={{display: 'flex', alignSelf: 'stretch', flexDirection: 'column'}}>
        <h3 css={{ textAlign: 'center', color: 'white'}}>
          First, prove you want it
        </h3>
        <p css={{ textAlign: 'center'}}>
          Order these life events
        </p>
        <List
          style={{ alignSelf: 'stretch', display: 'flex'}}
          rowHeight={60}
          order={this.state.order}
          onReOrder={order => this.setState({order})}
        >
          {items.map((i, index) =>
            <List.Item
              key={i.text}
              css={[styles.card, index === this.state.order[i.order] ? {border: '5px solid green'} : {border: '5px solid red'}]}
            >
              {i.text}
            </List.Item>
          )}
        </List>
      </div>
    )
  }

  renderVideo = () => {
    return(
      <div css={{display: 'flex', alignSelf: 'stretch', flexDirection: 'column'}}>
        <h1 css={{ textAlign: 'center'}}>
          You win!
        </h1>
        <p css={{ textAlign: 'center'}}>
          ...and so will I
        </p>
        <div css={{display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: '800px', margin: '0 auto', alignSelf: 'stretch', minWidth: '300px'}}>
          <div css={{ position: 'relative', overflow: 'hidden', paddingTop: '56.25%', width: '100%'}}>
            <iframe
              css={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0, }}
              src='https://www.youtube.com/embed/IqjC8e74ypg'
              frameBorder="0"
            >
            </iframe>
          </div>
        </div>
        <ButtonComponent
          onClick={this.onContact}
        >
          Contact Abe 👍
        </ButtonComponent>
        <ButtonComponent
          onClick={this.onDecline}
          secondary
        >
          This guy is junk 👎
        </ButtonComponent>
        <div css={{ marginTop: '30px', textAlign: 'center'}}>
          <div css={{ marginTop: '10px' }}><a target="_blank" href={'https://www.instagram.com/abe_clark/'}>Instagram</a></div>
          <div css={{ marginTop: '10px' }}><a target="_blank" href={'https://www.linkedin.com/in/abrahamclark/'}>LinkedIn</a></div>
          <div css={{ marginTop: '10px' }}><a target="_blank" href={'https://www.weareclarks.com'}>WeAreClarks | Family Blog</a></div>
          <div css={{ marginTop: '10px' }}><a target="_blank" href={'https://www.youtube.com/watch?v=Ro90lym1Rdc'}>Family Quarantine Video | Disney Sing-Along</a></div>
          <div css={{ marginTop: '10px' }}><a target="_blank" href={'tel:+16505323496'}>(650) 532-3496</a></div>
          <div css={{ marginTop: '10px' }}><a target="_blank" href={'mailto:abeaclark@gmail.com'}>abeaclark@gmail.com</a></div>
        </div>
      </div>
    )
  }

  render() {
    const stepFunctions = [
      this.renderStep0,
      this.renderStep1,
    ]

    const currentView = stepFunctions[this.state.currentStep]

    return (
      <div css={styles.outer}>
        <Helmet
          title={"Winner of Survivor 43: Abe Clark"}
        >
          <meta property="og:url" content="https://www.abeclark.com" />
          <meta property="og:description" content={"Caution: Only cast me if you're ok with me winning."} />
          <meta property="twitter:description" content={"Caution: Only cast me if you're ok with me winning."} />
          <meta property="og:title" content="Winner of Survivor 43: Abe Clark" />
          <meta property="og:image" content={"https://media.giphy.com/media/l378ohXSiuBGPdEaI/giphy.gif"} />
          <meta property="og:image:type" content="image/gif" />
          <meta property="og:image:height" content="263" />
          <meta property="og:video:type" content="video/mp4"/>
          <meta property="og:video:width" content="480"/>
          <meta property="og:video:height" content="263" />
          <meta property="og:video" content="https://i.giphy.com/media/l378ohXSiuBGPdEaI/giphy.mp4"/>
          <meta
            property="twitter:image"
            content={"https://media.giphy.com/media/l378ohXSiuBGPdEaI/giphy.gif"}
          />
        </Helmet>
        <div css={styles.inner}>
          {currentView()}
          {this.state.showVideo && this.renderVideo()}
        </div>
      </div>

    )
  }
}

export default Index
