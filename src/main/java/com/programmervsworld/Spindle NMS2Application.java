package com.programmervsworld;

import io.dropwizard.core.Application;
import io.dropwizard.core.setup.Bootstrap;
import io.dropwizard.core.setup.Environment;

public class Spindle NMS2Application extends Application<Spindle NMS2Configuration> {

    public static void main(final String[] args) throws Exception {
        new Spindle NMS2Application().run(args);
    }

    @Override
    public String getName() {
        return "Spindle NMS2";
    }

    @Override
    public void initialize(final Bootstrap<Spindle NMS2Configuration> bootstrap) {
        // TODO: application initialization
    }

    @Override
    public void run(final Spindle NMS2Configuration configuration,
                    final Environment environment) {
        // TODO: implement application
    }

}
