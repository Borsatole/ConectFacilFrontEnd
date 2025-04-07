import { Label } from "./label";
import PropTypes from "prop-types";


export function FormGroup({ label, id, children }) {
    return (
      <div>
        <Label htmlFor={id}>{label}</Label>
        <div className="mt-2">{children}</div>
      </div>
    );
  }
  

  FormGroup.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.node,
  }; 
