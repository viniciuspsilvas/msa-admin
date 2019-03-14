import { configure ,addDecorator} from '@storybook/react';
import { withInfo, setDefaults } from '@storybook/addon-info'

import 'bootstrap/dist/css/bootstrap.min.css';

//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


const req = require.context('../src/', true, /.story\.js$/)

function loadStories() {
  req.keys().forEach(req)
}

setDefaults({
  inline: true,
})

addDecorator((story, context) => withInfo(context.kind)(story)(context))
configure(loadStories, module)
