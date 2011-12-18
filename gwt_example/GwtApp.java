package com.robertsdionne.gwtapp.client;

import com.google.gwt.canvas.client.Canvas;
import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.dom.client.CanvasElement;
import com.google.gwt.user.client.ui.RootPanel;

/**
 * Entry point classes define <code>onModuleLoad()</code>.
 */
public class GwtApp implements EntryPoint {

  /**
   * This is the entry point method.
   */
  public void onModuleLoad() {
    final Canvas canvas = Canvas.createIfSupported();
    RootPanel.get("nameFieldContainer").add(canvas);
    CanvasElement canvasElement = canvas.getCanvasElement();
    canvasElement.setWidth(256);
    canvasElement.setHeight(256);
    Discoball.install(canvasElement, null);
    Discoball.start();
  }
}
