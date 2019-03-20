import { configure, addDecorator } from '@storybook/react';
import { withInfo, setDefaults } from '@storybook/addon-info'

import 'bootstrap/dist/css/bootstrap.min.css';

//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


addDecorator((story, context) => withInfo(context.kind)(story)(context))


//TODO - OS paramentos nao funcionam
//addParameters({ options: { goFullScreen: true }}) 


const req = require.context('../src/', true, /.story\.js$/)
function loadStories() {
  req.keys().forEach(req)
}
configure(loadStories, module)
