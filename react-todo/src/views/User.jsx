import { useState } from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function User () {
  const [userName, setUserName] = useState('王五');
  const match = useRouteMatch();

  function handleNameChange() {
    setUserName('王五aaaaaaaaaa');
  }

  function Topic() {
    let { topicId } = useParams();
    return <h3>Requested topic ID: {topicId}</h3>;
  }

  return ( 
   <div>
     <div>{userName}</div>
     <button onClick={handleNameChange}>change name</button>
     <Link to={`${match.url}/components`}> components </Link>
     <Link to={`${match.url}/props-v-state`}> props-v-state </Link>
     <div>
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
     </div>
   </div>
  )
}