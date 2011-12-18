package com.robertsdionne.gwtapp.client;

import com.google.gwt.core.client.JavaScriptObject;
import com.google.gwt.dom.client.CanvasElement;

public class Discoball {
  
  public static native JavaScriptObject options() /*-{
    return {};
  }-*/;

  public static native void install(CanvasElement canvas, JavaScriptObject options) /*-{
    $wnd.discoball.install(canvas, options);
  }-*/;
  
  public static native void start() /*-{
    $wnd.discoball.start();
  }-*/;
  
  public static native void uninstall() /*-{
    $wnd.discoball.uninstall();
  }-*/;
}
