package view;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import static staticContext.UtilityContext.*;

import javax.swing.*;

import staticContext.UtilityContext;
import controller.ButtonListener;

public class EpisodeCreationFrame extends JFrame implements ActionListener{
	private JButton eCOKButton;
	private JButton eCCancelButton;
	private JTextField eCEpisodeTitleTextbox;
	private JTextField eCEpisodeWriterTextbox;
	private JLabel eCEpisodeTitleLabel;
	private JLabel eCEpisodeWriterLabel;
	
	public EpisodeCreationFrame(){
		eCOKButton = new JButton("OK");
		eCCancelButton = new JButton("Cancel");
		eCEpisodeTitleTextbox = new JTextField();
		eCEpisodeWriterTextbox = new JTextField();
		eCEpisodeTitleLabel = new JLabel();
		eCEpisodeWriterLabel = new JLabel();
		init();
	}
	
	public void init(){
		this.add(eCOKButton);
		this.add(eCCancelButton);
		this.add(eCEpisodeTitleTextbox);
		this.add(eCEpisodeWriterTextbox);
		this.add(eCEpisodeTitleLabel);
		this.add(eCEpisodeWriterLabel);
		this.setLayout(null);
		this.setSize(300,200);
		this.setTitle("New Episode");
		eCCancelButton.addActionListener(this);
		
		eCEpisodeTitleLabel.setText("Episode Name");
		eCEpisodeWriterLabel.setText("Episode Writer");
		
		eCEpisodeTitleLabel.setLocation(20,30);
		eCEpisodeWriterLabel.setLocation(20,60);
		eCEpisodeTitleTextbox.setLocation(140, 30);
		eCEpisodeWriterTextbox.setLocation(140,60);
		
		eCEpisodeTitleLabel.setSize(100,25);
		eCEpisodeWriterLabel.setSize(100,25);
		eCEpisodeTitleTextbox.setSize(this.getWidth() - 180,25);
		eCEpisodeWriterTextbox.setSize(this.getWidth() - 180,25);
		
	
		eCOKButton.setActionCommand(ECOKButton);
		eCCancelButton.setActionCommand(ECCancelButton);
		eCOKButton.setLocation(50,this.getHeight() - 80);
		eCCancelButton.setLocation(160,this.getHeight() - 80);
		
		eCOKButton.setSize(80,30);
		eCCancelButton.setSize(80,30);
	}
	
	public String getWriter(){
		return eCEpisodeWriterTextbox.getText();
	}
	
	public String getTitle(){
		return eCEpisodeTitleTextbox.getText();
	}
	
	public void addButtonListener(ButtonListener bl) {
		eCOKButton.addActionListener(bl);
	}

	public void actionPerformed(ActionEvent e) {
		if(e.getActionCommand().equals(ECCancelButton)){
			closeWindow();
		}
	}
	
	public void closeWindow(){
		eCEpisodeTitleTextbox.setText(null);
		eCEpisodeWriterTextbox.setText(null);
		this.setVisible(false);
	}
}
