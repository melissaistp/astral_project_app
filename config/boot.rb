ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require 'bundler/setup' # Set up gems listed in the Gemfile.
require 'logger' # ActiveSupport::LoggerThreadSafeLevel needs Logger already defined; not guaranteed on Ruby 3.1+.
require 'bootsnap/setup' # Speed up boot time by caching expensive operations.
