import { CheckIcon, PhotographIcon, XIcon } from '@heroicons/react/solid';
import { Field } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';

const ImageUpload = (props) => {
    const {
        name,
        className,
        multiple,
        setFieldValue,
		error,
		value
    } = props;

    const [files, setFiles] = useState([]);
    const [thumbs, setThumbs] = useState([])

    const {
		isDragActive,
		isDragAccept,
		isDragReject,
		open,
		getRootProps,
		getInputProps
	} = useDropzone({
		noClick: true,
		noKeyboard: true,
		multiple: false,
		accept: 'image/*',
		onDrop: (acceptedFiles) => {
			const newFiles = acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file)
				})
			);
			setFiles(newFiles);
            setFieldValue(name, newFiles);
			
		}
	});

    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ')
    }

    useEffect(() => {
        console.log(value);
        if (value && value.length > 0) {
            setThumbs(getThumbs(value));
        } else {
            setThumbs(getThumbs([{
                name: "preview.png",
                preview: value.public_url
            }]))
        }
       
    }, [value]);

    useEffect(() => {
		// if (files && files.length === 0 && value && value.length === 1) {
		// 	setFiles(value.map(f => {
		// 		if (f.__typename === 'UploadFile') {
		// 			return {
		// 				preview: f.formats?.small?.url
		// 			}
		// 		}
		// 	}));
		// }
		if (thumbs?.length !== files?.length && files?.length > 0) {
			setThumbs(getThumbs(files));
            setFiles(files)
		}
		
	}, [error, files]);

    const getThumbs = (images) => {
        const thumbs = images ? images.map((file, i) => {
            return (
                <div
                    key={file.name+i}
                    className="text-center items-center justify-center content-center">
                        <img
                            className="object-contain max-h-48 mx-auto"
                            src={file.preview}
                            alt={file.name}
                        />
                </div>
            );
        }) : [];

        return thumbs;
    }

    const baseClasses = "relative px-4 inline-flex items-center py-2 border  text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500";

    return (
        <div>
            <button 
                className={baseClasses}
                onClick={open}>
                    Upload Image
            </button>
            <div className={classNames(
                "mt-6 md:block rounded-lg items-center",
                className,
                thumbs.length > 0 ? "border-none" : "border-4 border-dashed border-gray-200",
                isDragAccept ? " border-green-400" : "border-gray-300"
                
            )}>
                <div className="dropzone text-center">
					<div {...getRootProps({ className: 'dropzone-upload-wrapper' })}>
						<input {...getInputProps()} />
                       
                        <div className="dropzone-inner-wrapper">
                            { thumbs.length > 0 && !isDragAccept && 
                                <div className="object-contain h-12">
                                    {thumbs}
                                </div>
                            }

                            <>
                                { isDragAccept && (
                                    <div className="h-48 bg-green-50 text-center font-bold text-white content-center items-center">
                                        <CheckIcon className="w-24 h-24 inline-block mx-auto mt-12 text-green-400" />
                                    </div>
                                )}
                                { isDragReject && (
                                    <div className="h-48 bg-red-400 text-center font-weight-bold text-white d-flex justify-content-center align-items-center">
                                        <XIcon className="w-24 h-24 inline-block" />
                                    </div>
                                )}
                                { !isDragActive && thumbs.length === 0 && (
                                    <div className="h-48 text-center font-bold text-gray-500 ">
                                        <PhotographIcon className="h-24 w-24 mt-12 text-gray-300 inline-block" />
                                    </div>
                                )}
                            </>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageUpload;
