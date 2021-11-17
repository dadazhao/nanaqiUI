window.onload=function(){
	var treeBranchs = document.getElementsByClassName("nnq-tree__branch");
	for(var i=0;i<treeBranchs.length;i++){
		treeBranchs[i].onclick=function(){
			if(this.className.indexOf("nnq-icon-minus-circle")!=-1){
				this.className = this.className.replace("nnq-icon-minus-circle","nnq-icon-plus-circle")
				if(this.parentNode.nextElementSibling){
					this.parentNode.nextElementSibling.className = "nnq-hide";
				}
				return;
			}
			if(this.className.indexOf("nnq-icon-plus-circle")!=-1){
				this.className = this.className.replace("nnq-icon-plus-circle","nnq-icon-minus-circle")
				if(this.parentNode.nextElementSibling){
					this.parentNode.nextElementSibling.className = "";
				}
				return;
			}
			
			if(this.className.indexOf("nnq-icon-down-triangle")!=-1){
				this.className = this.className.replace("nnq-icon-down-triangle","nnq-icon-right-triangle")
				if(this.parentNode.nextElementSibling){
					this.parentNode.nextElementSibling.className = "nnq-hide";
				}
				return;
			}
			if(this.className.indexOf("nnq-icon-right-triangle")!=-1){
				this.className = this.className.replace("nnq-icon-right-triangle","nnq-icon-down-triangle")
				if(this.parentNode.nextElementSibling){
					this.parentNode.nextElementSibling.className = "";
				}
				return;
			}
		}
	}
}
