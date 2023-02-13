import React, { Component, Fragment} from 'react'
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Logo from './components/Logo/Logo'
import Register from './components/Register/Register'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from "./components/Rank/Rank"
import SignIn from "./components/SignIn/SignIn"
import Clarifai  from 'clarifai'
import "./App.css";


const app = new Clarifai.App({
  apiKey: '6f3a240ed6c04cb4a1cfdde175ac7791'
 });
class App extends Component {

  constructor (){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
  }



  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }


  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then(response => this.displayFaceBox((this.calculateFaceLocation(response)))
      .catch(err => console.log(err))
    );
}

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    } else{
      this.setState({route: route})
    }
  }



  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <Fragment>
        <div>
            <ParticlesBg className="particles" type="lines" bg={true} />

            <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
            { route === 'home' ? 
                <div>
                  <Logo />
                  <Rank />
                  <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit= {this.onButtonSubmit} />
                  <FaceRecognition box={box} imageUrl={imageUrl}/>
                </div>
                : (route === 'signin'
                    ? <SignIn onRouteChange={this.onRouteChange} />
                    : <Register onRouteChange={this.onRouteChange} />
                )
            }
        </div>
      </Fragment>
    );
  }
}

export default App;
