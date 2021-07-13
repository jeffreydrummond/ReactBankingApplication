function Card(props) {

    function classes() {
        const bg = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
        const txt = props.txtcolor ? ' test-' + props.txtcolor : ' text-white';
        return 'card mb-3 ' + bg + txt;
    }

    return(
        <div className={classes()} style={{maxWidth: "33rem"}}>
            <div className="card-header">{props.header}</div>
            <div className="card-body">
                {props.title && (<h5 className="card-title">{props.title}</h5>)}
                {props.text && (<h5 className="card-text">{props.text}</h5>)}
                {props.body}
                {props.status && (<div id="createStatus">{props.status}</div>)}
            </div>
        </div>
    );
}
export default Card;