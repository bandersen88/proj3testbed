import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";

let ReactGridLayout = WidthProvider(RGL);
let originalLayout = getFromLS("layout") || [];
let secondLayout = originalLayout;
let totalHeight = 18;
/**
 * This layout demonstrates how to sync to localstorage.
 */
class LocalStorageLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: 100,
    // cols: { lg: 100, md: 10, sm: 200, xs: 4, xxs: 2 },
    rowHeight: 5,
    onLayoutChange: function() {}
  };

  constructor(props) {
    super(props);

    this.state = {
      layout: JSON.parse(JSON.stringify(originalLayout)),
      number: 1
    };

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
  }



  resetLayout() {
    console.log("About to Reset State 3")
    this.setState({
      layout: originalLayout
    });
  }

  secondResetLayout() {
    console.log("About to Reset State 4")
    this.setState({
      layout: secondLayout
    });
  }

  onLayoutChange = layout => {
    /*eslint no-console: 0*/
    saveToLS("layout", layout);
    this.setState({ layout });
    this.props.onLayoutChange(layout);
    let ls = {};

    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
      } catch (e) {
        /*Ignore*/
      }
    }
    // updates status display
    // console.log("In the Layout Change");

    // console.log("Changing Layout");
    // console.log(global.localStorage.getItem("rgl-7"));
    // console.log("Original Storage: ", ls.layout)
    // console.log("This State Layout");
    // console.log(this.state.layout);

    // console.log("Original Original: ", originalLayout);
    // console.log("Original Second: ", secondLayout);

    // console.log("Change Layout");
    saveToLS("layout", global.localStorage.getItem("rgl-7"));
    secondLayout = originalLayout;
    originalLayout = this.state.layout;

    // if (global.localStorage) {
    //     try {
    //       ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
    //     } catch (e) {
    //       /*Ignore*/
    //     }
    //   }

    // console.log("Second State Layout");
    // console.log(this.state.layout);
    // console.log("Second Original: ", originalLayout);
    // console.log("Second Second: ", secondLayout);

    // console.log("Original Layout", originalLayout);
    // console.log("Height: ",this.state.layout[0].h)
    // console.log("Second Storage: ", ls.layout)

    // console.log("Layout",ls.layout);
    // console.log(ls.layout.layout)
    // console.log(ls.layout[0].h)
    // if(ls.layout[0].h>4){
    //     console.log("******************************************")
    //     // this.resetLayout();
    //     this.setState({ layout : originalLayout  });
    // }
    // this.testFunction();
  };

  onAddItem() {
    // console.log("In Add Item")
    // console.log(this.state.layout);
    // console.log(originalLayout)
    // console.log(JSON.parse('{"layout":[{"w":40,"h":4,"x":60,"y":38,"i":"1","moved":false,"static":false},{"w":59,"h":18,"x":41,"y":10,"i":"2","moved":false,"static":false},{"w":21,"h":10,"x":0,"y":0,"i":"3","moved":false,"static":false},{"w":21,"h":10,"x":25,"y":0,"i":"4","moved":false,"static":false},{"w":21,"h":10,"x":50,"y":28,"i":"5","moved":false,"static":false}]}'))
    let ls = JSON.parse('{"layout":[{"w":40,"h":4,"x":60,"y":38,"i":"1","moved":false,"static":false},{"w":59,"h":18,"x":41,"y":10,"i":"2","moved":false,"static":false},{"w":21,"h":10,"x":0,"y":0,"i":"3","moved":false,"static":false},{"w":21,"h":10,"x":25,"y":0,"i":"4","moved":false,"static":false},{"w":21,"h":10,"x":50,"y":28,"i":"5","moved":false,"static":false}]}')

    // console.log("LS: ", ls)
    ls.layout[0].h=7;
    // console.log(ls)
    let stringLS = JSON.stringify(ls);
    // console.log(stringLS);
    originalLayout = stringLS;

    this.resetLayout();

    // console.log(JSON.parse('{"layout":"John"}'))
      // "layout":[
        // {"w":40,"h":4,"x":60,"y":38,"i":"1","moved":false,"static":false},
        // {"w":59,"h":18,"x":41,"y":10,"i":"2","moved":false,"static":false},
        // {"w":21,"h":10,"x":0,"y":0,"i":"3","moved":false,"static":false},
        // {"w":21,"h":10,"x":25,"y":0,"i":"4","moved":false,"static":false},
        // {"w":21,"h":10,"x":50,"y":28,"i":"5","moved":false,"static":false}
      // ]
    // let ls = JSON.parse(JSON.stringify(this.state));
    // console.log(JSON.parse(global.localStorage.getItem("rgl-7")))
  }

  componentWillUpdate(prevProps, prevState) {
    let check = false;
    let layout = this.state.layout;

    if (layout[0].w) {
      layout.forEach(e => {
        //     console.log("ID: ",e.i)
        //     console.log("Height: ", e.h);
        //     console.log("Y-Axis", e.y);
        //     console.log("Total Height:", e.y+e.h);
        if (e.h + e.y > totalHeight) {
          check = true;
          console.log("Check", check);
        }
      });
    }

    if (check) {

      if (arraysEqual(this.state.layout, originalLayout)) {
        console.log("About to Reset State 1")
        this.secondResetLayout();
      } else {
        console.log("About to Reset State 2")
        this.resetLayout();
      }
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.resetLayout}>Reset Layout</button>
        <button onClick={this.secondResetLayout}>Second Reset Layout</button>
        {/* <button onClick={() => saveToLS("layout", this.state.layout)}>
          Save Layout
        </button> */}
        <button onClick={this.onAddItem}>Add Item</button>
        <ReactGridLayout
          {...this.props}
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
        >
          <div key="1" data-grid={{ w: 40, h: 4, x: 75, y: 0 }}>
            <span className="text">1</span>
          </div>
          <div key="2" data-grid={{ w: 59, h: 1, x: 125, y: 0 }}>
            <span className="text">2</span>
          </div>
          <div key="3" data-grid={{ w: 21, h: 2, x: 0, y: 0 }}>
            <span className="text">3</span>
          </div>
          <div key="4" data-grid={{ w: 21, h: 2, x: 25, y: 0 }}>
            <span className="text">4</span>
          </div>
          <div key="5" data-grid={{ w: 21, h: 2, x: 50, y: 0 }}>
            <span className="text">5</span>
          </div>
        </ReactGridLayout>
      </div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-7",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (var i = arr1.length; i--; ) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

export default LocalStorageLayout;
