package iklim.fieldCurtain;

import static iklim.engine.defaultIklimEngine.Configuration.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.nio.FloatBuffer;
import java.nio.IntBuffer;
import java.nio.channels.Channels;
import java.nio.channels.FileChannel;
import java.nio.channels.ReadableByteChannel;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;
import java.util.Set;

import org.lwjgl.BufferUtils;
import org.lwjgl.glfw.*;
import org.lwjgl.openal.AL;
import org.lwjgl.openal.AL10;
import org.lwjgl.openal.ALC;
import org.lwjgl.openal.ALC11;
import org.lwjgl.openal.ALCCapabilities;
import org.lwjgl.openal.ALContext;
import org.lwjgl.openal.ALDevice;
import org.lwjgl.openal.EFXUtil;
import org.lwjgl.openal.EnumerateAllExt;
import org.lwjgl.openal.Util;
import org.lwjgl.opengl.GL;
import org.lwjgl.opengl.GLContext;



import org.lwjgl.stb.STBVorbisInfo;

import static org.lwjgl.openal.AL10.*;
import static org.lwjgl.openal.ALC.*;
import static org.lwjgl.openal.ALC10.*;
import static org.lwjgl.openal.ALC11.*;
import static org.lwjgl.openal.EXTEfx.*;
import static org.lwjgl.stb.STBVorbis.*;
import static org.lwjgl.glfw.Callbacks.*;
import static org.lwjgl.glfw.GLFW.*;
import static org.lwjgl.opengl.GL11.*;
import static org.lwjgl.system.MemoryUtil.*;
import static iklim.engine.defaultIklimEngine.Configuration.ViewConfig.*;

public class Test{
	private GLFWErrorCallback				errorCallback;
	private GLFWKeyCallback					keyCallback;
	private ALDevice						device;
	private long							window;
	
	public Test() {
		glfwSetErrorCallback(errorCallback = errorCallbackPrint(System.err));
//		execute(new String[]{});
		
		try{
			device = ALDevice.create(null);
			ALCCapabilities caps = device.getCapabilities();
			if ( caps.OpenALC11 ) {
				List<String> devices = ALC.getStringList(0L, ALC_ALL_DEVICES_SPECIFIER);
				for ( int i = 0; i < devices.size(); i++ ) {
					System.out.println(i + ": " + devices.get(i));
				}
			}
			ALContext context = ALContext.create(device);
			
			
			
			glfwInit();
			glfwDefaultWindowHints();
			glfwWindowHint(GLFW_VISIBLE, GL_FALSE);
			glfwWindowHint(GLFW_RESIZABLE, GL_FALSE);
				
			STBVorbisInfo info = new STBVorbisInfo();
			
			ByteBuffer pcm = ioResourceToByteBuffer("./resource/sound/cursorMove.wav", 1000*1024);
			
//			IntBuffer error = BufferUtils.createIntBuffer(1);
//			long decoder = stb_vorbis_open_memory(vorbis,error,null);
//			System.out.println(error.get(0));
//			stb_vorbis_get_info(decoder,info.buffer());
//			int channels = info.getChannels();
//			int lengthSamples = stb_vorbis_stream_length_in_samples(decoder);
//			ByteBuffer pcm = BufferUtils.createByteBuffer(lengthSamples*2);
//			stb_vorbis_get_samples_short_interleaved(decoder, channels, pcm, lengthSamples);
//			stb_vorbis_close(decoder);
			
			int buffer = alGenBuffers();
			int source = alGenSources();
			alBufferData(buffer, AL_FORMAT_MONO16, pcm, info.getSampleRate());
			alSourcei(source, AL_BUFFER, buffer);
			alSourcei(source, AL_LOOPING, AL_TRUE);
			alSourcePlay(source);
			Thread.sleep(10000);
			alSourceStop(source);
			alDeleteSources(source);
			alDeleteBuffers(buffer);
			window = glfwCreateWindow(FrameWidth, FrameHeight, "Test", NULL, NULL);
			
			glfwSetKeyCallback(window, keyCallback = new GLFWKeyCallback() {
				
				@Override
				public void invoke(long window, int key, int scancode, int action, int mods) {
					if(key==GLFW_KEY_ESCAPE && action == GLFW_RELEASE){
						glfwSetWindowShouldClose(window, GL_TRUE);
					}
					
				}
			});
			
			ByteBuffer vidmode = glfwGetVideoMode(glfwGetPrimaryMonitor());
			glfwSetWindowPos(window, (GLFWvidmode.width(vidmode)-FrameWidth)/2, (GLFWvidmode.height(vidmode)-FrameHeight)/2);
			glfwMakeContextCurrent(window);
			glfwSwapInterval(1);
			glfwShowWindow(window);
			
			
			GLContext.createFromCurrent();
			glClearColor(1f, 1f, 1f, 0f);
			
			
			while(glfwWindowShouldClose(window)==GL_FALSE){
				  IntBuffer intbuffer = BufferUtils.createIntBuffer(1);
				  IntBuffer intsource = BufferUtils.createIntBuffer(1);
				  /** Position of the source sound. */
				  FloatBuffer sourcePos = BufferUtils.createFloatBuffer(3).put(new float[] { 0.0f, 0.0f, 0.0f });
				   
				  /** Velocity of the source sound. */
				  FloatBuffer sourceVel = BufferUtils.createFloatBuffer(3).put(new float[] { 0.0f, 0.0f, 0.0f });
				   
				  /** Position of the listener. */
				  FloatBuffer listenerPos = BufferUtils.createFloatBuffer(3).put(new float[] { 0.0f, 0.0f, 0.0f });
				   
				  /** Velocity of the listener. */
				  FloatBuffer listenerVel = BufferUtils.createFloatBuffer(3).put(new float[] { 0.0f, 0.0f, 0.0f });
				   
				  /** Orientation of the listener. (first 3 elements are "at", second 3 are "up") */
				  FloatBuffer listenerOri =
				      BufferUtils.createFloatBuffer(6).put(new float[] { 0.0f, 0.0f, -1.0f,  0.0f, 1.0f, 0.0f });
				  
				  
				glClear(GL_COLOR_BUFFER_BIT|GL_DEPTH_BUFFER_BIT);
				glfwPollEvents();
				glfwSwapBuffers(window);
			}
			
			
			
			glfwDestroyWindow(window);
			keyCallback.release();
			context.destroy();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			glfwTerminate();
			errorCallback.release();
			device.destroy();
		}
		
	}
	
	public ByteBuffer ioResourceToByteBuffer(String resource, int bufferSize) throws IOException {
		ByteBuffer buffer;

		File file = new File(resource);
		if ( file.isFile() ) {
			FileChannel fc = new FileInputStream(file).getChannel();
			buffer = BufferUtils.createByteBuffer((int)fc.size() + 1);

			while ( fc.read(buffer) != -1 ) ;

			fc.close();
		} else {
			buffer = BufferUtils.createByteBuffer(bufferSize);

			InputStream source = Thread.currentThread().getContextClassLoader().getResourceAsStream(resource);
			if ( source == null )
				throw new FileNotFoundException(resource);

			try {
				ReadableByteChannel rbc = Channels.newChannel(source);
				try {
					while ( true ) {
						int bytes = rbc.read(buffer);
						if ( bytes == -1 )
							break;
//						if ( buffer.remaining() == 0 )
//							buffer = resizeBuffer(buffer, buffer.capacity() * 2);
					}
				} finally {
					rbc.close();
				}
			} finally {
				source.close();
			}
		}

		buffer.flip();
		return buffer;
	}
	
	protected void execute(String[] args) {
		ALContext alContext = null;
		try {
			alContext = ALContext.create(ALDevice.create(args.length == 0 ? null : args[0]), 0, 60, false);
			checkForErrors(alContext);
		} catch (Exception e) {
			die("Init", e.getMessage());
		}

		printALCInfo(alContext);
		printALInfo(alContext);
		printEFXInfo(alContext);

		checkForErrors(alContext);

		AL.destroy(alContext);
	}

	private void printALCInfo(ALContext alContext) {

		// we're running 1.1, so really no need to query for the 'ALC_ENUMERATION_EXT' extension
		if ( ALC.getCapabilities().ALC_ENUMERATION_EXT ) {
			if ( ALC.getCapabilities().ALC_ENUMERATE_ALL_EXT ) {
				printDevices(alContext, 0, EnumerateAllExt.ALC_ALL_DEVICES_SPECIFIER, "playback");
			} else {
				printDevices(alContext, 0, ALC_DEVICE_SPECIFIER, "playback");
			}
			printDevices(alContext, 0, ALC11.ALC_CAPTURE_DEVICE_SPECIFIER, "capture");
		} else {
			System.out.println("No device enumeration available");
		}

		if ( ALC.getCapabilities().ALC_ENUMERATE_ALL_EXT ) {
			System.out.println("Default playback device: " + alcGetString(0, EnumerateAllExt.ALC_DEFAULT_ALL_DEVICES_SPECIFIER));
		} else {
			System.out.println("Default playback device: " + alcGetString(0, ALC_DEFAULT_DEVICE_SPECIFIER));
		}

		System.out.println("Default capture device: " + alcGetString(0, ALC11.ALC_CAPTURE_DEFAULT_DEVICE_SPECIFIER));

		int majorVersion = alcGetInteger(0, ALC_MAJOR_VERSION);
		int minorVersion = alcGetInteger(0, ALC_MINOR_VERSION);
		checkForErrors(alContext);

		System.out.println("ALC version: " + majorVersion + "." + minorVersion);

		System.out.println("ALC extensions:");
		String[] extensions = alcGetString(alContext.getDevice().getPointer(), ALC_EXTENSIONS).split(" ");
		for ( String extension : extensions ) {
			if ( extension.trim().isEmpty() ) {
				continue;
			}
			System.out.println("    " + extension);
		}
		checkForErrors(alContext);
	}

	private void printALInfo(ALContext alContext) {
		System.out.println("OpenAL vendor string: " + alGetString(AL_VENDOR));
		System.out.println("OpenAL renderer string: " + alGetString(AL_RENDERER));
		System.out.println("OpenAL version string: " + alGetString(AL_VERSION));
		System.out.println("AL extensions:");
		String[] extensions = alGetString(AL_EXTENSIONS).split(" ");
		for ( String extension : extensions ) {
			if ( extension.trim().isEmpty() ) {
				continue;
			}
			System.out.println("    " + extension);
		}
		checkForErrors(alContext);
	}

	private void printEFXInfo(ALContext alContext) {
		if ( !EFXUtil.isEfxSupported() ) {
			System.out.println("EFX not available");
			return;
		}

		long device = alContext.getDevice().getPointer();

		int efxMajor = alcGetInteger(device, ALC_EFX_MAJOR_VERSION);
		int efxMinor = alcGetInteger(device, ALC_EFX_MINOR_VERSION);
		if ( alcGetError(device) == ALC_NO_ERROR ) {
			System.out.println("EFX version: " + efxMajor + "." + efxMinor);
		}

		int auxSends = alcGetInteger(device, ALC_MAX_AUXILIARY_SENDS);
		if ( alcGetError(device) == ALC_NO_ERROR ) {
			System.out.println("Max auxiliary sends: " + auxSends);
		}

		System.out.println("Supported filters: ");
		HashMap<String, Integer> filters = new HashMap<String, Integer>();
		filters.put("Low-pass", AL_FILTER_LOWPASS);
		filters.put("High-pass", AL_FILTER_HIGHPASS);
		filters.put("Band-pass", AL_FILTER_BANDPASS);

		Set<Entry<String, Integer>> entries = filters.entrySet();
		for ( Entry<String, Integer> entry : entries ) {
			if ( EFXUtil.isFilterSupported(entry.getValue()) )
				System.out.println("    " + entry.getKey());
		}

		System.out.println("Supported effects: ");
		HashMap<String, Integer> effects = new HashMap<String, Integer>();
		effects.put("EAX Reverb", AL_EFFECT_EAXREVERB);
		effects.put("Reverb", AL_EFFECT_REVERB);
		effects.put("Chorus", AL_EFFECT_CHORUS);
		effects.put("Distortion", AL_EFFECT_DISTORTION);
		effects.put("Echo", AL_EFFECT_ECHO);
		effects.put("Flanger", AL_EFFECT_FLANGER);
		effects.put("Frequency Shifter", AL_EFFECT_FREQUENCY_SHIFTER);
		effects.put("Vocal Morpher", AL_EFFECT_VOCAL_MORPHER);
		effects.put("Pitch Shifter", AL_EFFECT_PITCH_SHIFTER);
		effects.put("Ring Modulator", AL_EFFECT_RING_MODULATOR);
		effects.put("Autowah", AL_EFFECT_AUTOWAH);
		effects.put("Compressor", AL_EFFECT_COMPRESSOR);
		effects.put("Equalizer", AL_EFFECT_EQUALIZER);

		entries = effects.entrySet();
		for ( Entry<String, Integer> entry : entries ) {
			if ( EFXUtil.isEffectSupported(entry.getValue()) )
				System.out.println("    " + entry.getKey());
		}
	}

	private void printDevices(ALContext alContext, long contextDevice, int which, String kind) {
		List<String> devices = ALC.getStringList(contextDevice, which);
		checkForErrors(alContext);

		System.out.println("Available " + kind + " devices: ");
		for ( String device : devices ) {
			System.out.println("    " + device);
		}
	}

	private void die(String kind, String description) {
		System.out.println(kind + " error " + description + " occured");
	}

	private void checkForErrors(ALContext alContext) {
		{
			long device = alContext.getDevice().getPointer();

			int error = alcGetError(device);
			if ( error != ALC_NO_ERROR ) {
				die("ALC", alcGetString(device, error));
			}
		}
		{
			int error = alGetError();
			if ( error != AL_NO_ERROR ) {
				die("AL", alGetString(error));
			}
		}
	}
	
	public static void main(String[] args) {
		new Test();
	}
	
}
