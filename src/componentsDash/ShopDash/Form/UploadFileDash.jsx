import React from "react";

const UploadFileDash = () => {
	return (
		<div className="form-group">
			<label>File upload</label>

			<input type="file" name="img[]" className="file-upload-default" />
			<div className="input-group col-xs-12">
				<input
					type="text"
					className="form-control file-upload-info"
					disabled=""
					placeholder="Upload Image"
				/>
				<div className="input-group-append">
					<button
						className="file-upload-browse btn btn-info"
						type="button"
					>
						Upload
					</button>
				</div>
			</div>
		</div>
	);
};

export default UploadFileDash;
