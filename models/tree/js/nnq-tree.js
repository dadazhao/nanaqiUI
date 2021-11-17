window.onload=function(){
	var branchClassName = "nnq-tree__branch";
	var hideClassName = "nnq-hide";
	
	var outlineTreeOpenClassName = "nnq-icon-minus-circle";
	var outlineTreeCloseClassName = "nnq-icon-plus-circle";
	
	var defaultTreeOpenClassName = "nnq-icon-down-triangle";
	var defaultTreeCloseClassName = "nnq-icon-right-triangle";
	
	var treeBranchs = document.getElementsByClassName(branchClassName);
	for(var i=0;i<treeBranchs.length;i++){
		treeBranchs[i].onclick=function(){
			if(this.className.indexOf(outlineTreeOpenClassName)!=-1){
				this.className = this.className.replace(outlineTreeOpenClassName,outlineTreeCloseClassName)
				if(this.parentNode.nextElementSibling){
					this.parentNode.nextElementSibling.className = hideClassName;
				}
				return;
			}
			if(this.className.indexOf(outlineTreeCloseClassName)!=-1){
				this.className = this.className.replace(outlineTreeCloseClassName,outlineTreeOpenClassName)
				if(this.parentNode.nextElementSibling){
					this.parentNode.nextElementSibling.className = "";
				}
				return;
			}
			
			if(this.className.indexOf(defaultTreeOpenClassName)!=-1){
				this.className = this.className.replace(defaultTreeOpenClassName,defaultTreeCloseClassName)
				if(this.parentNode.nextElementSibling){
					this.parentNode.nextElementSibling.className = hideClassName;
				}
				return;
			}
			if(this.className.indexOf(defaultTreeCloseClassName)!=-1){
				this.className = this.className.replace(defaultTreeCloseClassName,defaultTreeOpenClassName)
				if(this.parentNode.nextElementSibling){
					this.parentNode.nextElementSibling.className = "";
				}
				return;
			}
		}
	}
}
