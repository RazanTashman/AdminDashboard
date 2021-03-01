import { Link } from 'react-router-dom';
import logo from "./logo.jpg"
function Nav() {
    const mystyle = {
        // width: "550px",
        // marginLeft: "450px",
        // marginTop: "180px"
        position: 'fixed',
        width: '100%',
        // height: '50px',
        // padding: "10px",
        // right: 0,
    };
   

    // function openNav() {
    //     document.getElementById("mySidenav").style.width = "250px";
    //     }

    //     function closeNav() {
    //     document.getElementById("mySidenav").style.width = "0";
    //     }
    // 	var styling={
    // 		backgroundColor: "#FFFFFF",
    // 		color:"#828282,"
    // 	}
    return (



        <div >

<nav  style ={mystyle} class="navbar navbar-expand-lg pos-f-t  navbar-dark bg-warning navbar fixed-top ">
    <Link to="/home" className="navbar-brand" ><img src={logo}  style={{marginTop:"-20px",width:"90px" , height:"60px"}} /></Link>
		<Link to="/home" className="navbar-brand text-white" > <b>Yummy Bayt </b> <span class="sr-only"></span></Link>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
		  <span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarText">
		  <ul class="navbar-nav mr-auto">
			<li class="nav-item active">
              <Link to="/orders" className="nav-link" style={{marginLeft:"20px",fontWeight: 'bold', fontSize:"15px"}}>Orders</Link>
			</li>
			<li class="nav-item active">
              <Link to="/additem" className="nav-link"  style={{marginLeft:"20px",fontWeight: 'bold', fontSize:"15px"}}>Add Items</Link>
			</li>
			<li class="nav-item active">
              <Link to="/items" className="nav-link" style={{marginLeft:"20px",fontWeight: 'bold', fontSize:"15px"}}>Menu Items</Link>
			</li>
			<li class="nav-item active">
                <Link to="/" className="nav-link" style={{marginLeft:"450px",fontWeight: 'bold', fontSize:"15px"}} onClick={() => { localStorage.removeItem('token') }}>Sign Out</Link>
			</li>
		  </ul>
		  
		</div>
	  </nav>

            {/* <nav className=" navbar navbar-dark bg-warning  navbar-expand-lg fixed-top ">
           
                <nav  id="mySidenav" className="sidenav" >
                <a href="javascript:void(0)" class="closebtn" onClick={() => closeNav()}>&times;</a>
                <Link to="/" className="navbar-brand" ><img src={logo}  /></Link>
                <Link to="/#" className="navbar-brand" >Yummy Bayt</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">

                        <li className="navbar-item">
                            <Link to="/orders" className="navbar-brand" >Orders</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/additem" className="navbar-brand"  >Add Items</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/items" className="navbar-brand" >Menu Items</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/singnin" className="navbar-brand" onClick={() => { localStorage.removeItem('token') }}>Sign Out</Link>
                        </li>
                    </ul>
                </div>
            </nav> */}
            {/* <span onClick={() => openNav)}>&#9776; open</span> */}
        </div>



        //         <div>
        //         <nav class="mnb navbar navbar-default navbar-fixed-top">
        //   <div class="container-fluid">
        //     <div class="navbar-header">
        //       <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        //         <span class="sr-only">Toggle navigation</span>
        //         <i class="ic fa fa-bars"></i>
        //       </button>
        //       <div style= {{padding: "15px 0;"}}>
        //          <a href="#" id="msbo"><i class="ic fa fa-bars"></i></a>
        //       </div>
        //     </div>
        //     <div id="navbar" class="navbar-collapse collapse">
        //       <ul class="nav navbar-nav navbar-right">
        //         <li><a href="#">En</a></li>
        //         <li class="dropdown">
        //           <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Draude Oba <span class="caret"></span></a>
        //           <ul class="dropdown-menu">
        //             <li><a href="#">Settings</a></li>
        //             <li><a href="#">Upgrade</a></li>
        //             <li><a href="#">Help</a></li>
        //             <li role="separator" class="divider"></li>
        //             <li><a href="#">Logout</a></li>
        //           </ul>
        //         </li>
        //         <li><a href="#"><i class="fa fa-bell-o"></i></a></li>
        //         <li><a href="#"><i class="fa fa-comment-o"></i></a></li>
        //       </ul>
        //       <form class="navbar-form navbar-right">
        //         <input type="text" class="form-control" placeholder="Search..."/>
        //       </form>
        //     </div>
        //   </div>
        // </nav>

        // <div class="msb" id="msb">
        // 		<nav class="navbar navbar-default" role="navigation">

        // 			<div class="navbar-header">
        // 				<div class="brand-wrapper">

        // 					<div class="brand-name-wrapper">
        // 						<a class="navbar-brand" href="#">
        // 						</a>
        // 					</div>

        // 				</div>

        // 			</div>


        // 			<div class="side-menu-container">
        // 				<ul class="nav navbar-nav">

        // 					<li><a href="#"><i class="fa fa-dashboard"></i> Dashboard</a></li>
        // 					<li class="active"><a href="#"><i class="fa fa-puzzle-piece"></i> Components</a></li>
        // 					<li><a href="#"><i class="fa fa-heart"></i> Extras</a></li>
        // 					<li><a href="#"><span class="glyphicon glyphicon-signal"></span> Link</a></li>
        // 				</ul>
        // 			</div>
        // 		</nav>  
        // </div>

        // <div class="mcw">
        //   <div class="cv">
        //     <div>
        //      <div class="inbox">
        //        <div class="inbox-sb">

        //        </div>
        //        <div class="inbox-bx container-fluid">
        //        </div>
        //      </div>
        //     </div>
        //   </div>
        // </div>
        // </div>     

    );
}

export default Nav;
