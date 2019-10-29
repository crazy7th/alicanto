// import Header from './Header'
// import LabelBottomNavigation from './LabelBottomNavigation'
// import "../static/css/style.sass"

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = props => (
  <div className="App">
    {/* <Header /> */}
    {props.content}
    {/* <LabelBottomNavigation value={props.value}/> */}
  </div>
)

export default Layout