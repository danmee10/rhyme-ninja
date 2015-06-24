require File.expand_path('../boot', __FILE__)

require 'rails/all'

Bundler.require(*Rails.groups)

module RhymeNinja
  class Application < Rails::Application
    config.app_generators.scaffold_controller :responders_controller

    config.active_record.raise_in_transactional_callbacks = true

    config.angular_templates.ignore_prefix = 'angular_ninja'

    config.autoload_paths += Dir[Rails.root.join('app', 'wrappers')]
  end
end
