package iklim.engine.defaultIklimEngine.viewer;

import static iklim.engine.defaultIklimEngine.Configuration.ViewConfig.*;

public class LayoutUtility {
	public enum RelativeFrom { Up, Down, Left, Right}
	public enum RelationBy {Percentage, Point}
	
	
	public static int getRelativePosition(int relativePos, RelativeFrom from, RelationBy by){
		switch (from) {
		case Up:
			if(by == RelationBy.Point){
				return relativePos;
			}else{
				return FrameHeight*(relativePos/100);
			}
		case Down:
			if(by == RelationBy.Point){
				return FrameHeight-relativePos;
			}else{
				return FrameHeight - FrameHeight*(relativePos/100);
			}
		case Left:
			if(by == RelationBy.Point){
				return relativePos;
			}else{
				return FrameWidth*(relativePos/100);
			}
		case Right:
			if(by == RelationBy.Point){
				return relativePos;
			}else{
				return FrameWidth - FrameWidth*(relativePos/100);
			}
		default:
			break;
		
		
		}
		
		return 0;
	}
}
